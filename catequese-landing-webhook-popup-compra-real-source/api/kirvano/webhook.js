const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const KIRVANO_WEBHOOK_TOKEN = process.env.KIRVANO_WEBHOOK_TOKEN || '';

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function collectStrings(input, out = []) {
  if (input === null || input === undefined) return out;
  if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
    out.push(String(input));
    return out;
  }
  if (Array.isArray(input)) {
    for (const item of input) collectStrings(item, out);
    return out;
  }
  if (typeof input === 'object') {
    for (const [key, value] of Object.entries(input)) {
      out.push(String(key));
      collectStrings(value, out);
    }
  }
  return out;
}

function findByKey(input, wantedKeys) {
  const stack = [input];
  const wanted = wantedKeys.map(normalize);
  while (stack.length) {
    const item = stack.shift();
    if (!item || typeof item !== 'object') continue;
    if (Array.isArray(item)) {
      stack.push(...item);
      continue;
    }
    for (const [key, value] of Object.entries(item)) {
      const nKey = normalize(key);
      if (wanted.some((wantedKey) => nKey === wantedKey || nKey.includes(wantedKey))) {
        if (typeof value === 'string' || typeof value === 'number') return String(value);
      }
      if (value && typeof value === 'object') stack.push(value);
    }
  }
  return '';
}

function findEmail(input) {
  const direct = findByKey(input, ['email', 'customer_email', 'buyer_email', 'client_email']);
  if (direct && direct.includes('@')) return direct.trim().toLowerCase();
  const all = collectStrings(input).join(' ');
  const match = all.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match ? match[0].trim().toLowerCase() : '';
}

function last4Digits(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length >= 4 ? digits.slice(-4) : '';
}

function findCode(input) {
  const candidates = [
    findByKey(input, ['document', 'cpf', 'cnpj', 'tax_id', 'phone', 'telephone', 'whatsapp', 'customer_phone', 'buyer_phone']),
  ];
  for (const candidate of candidates) {
    const code = last4Digits(candidate);
    if (code) return code;
  }
  return '';
}

function getOrderId(input) {
  const keys = [
    'order_id', 'orderid', 'transaction_id', 'transactionid', 'sale_id', 'saleid',
    'purchase_id', 'purchaseid', 'payment_id', 'paymentid', 'checkout_id', 'checkoutid',
    'invoice_id', 'invoiceid', 'id'
  ];
  const found = findByKey(input, keys);
  if (found) return String(found).slice(0, 180);
  return `kirvano-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function envTokens(name, defaults) {
  const raw = process.env[name] || '';
  const tokens = raw
    .split(/[;,\n]/g)
    .map((x) => normalize(x.trim()))
    .filter(Boolean);
  return [...defaults.map(normalize), ...tokens];
}

function hasAny(text, tokens) {
  return tokens.some((token) => token && text.includes(token));
}

function detectAccess(payload) {
  const haystack = normalize(collectStrings(payload).join(' | '));

  const approvedTokens = envTokens('KIRVANO_APPROVED_MATCH', [
    'approved', 'paid', 'confirmed', 'completed', 'aprovado', 'pago', 'confirmado',
    'payment_approved', 'purchase_approved', 'sale_approved', 'order.paid', 'order_paid'
  ]);

  const looksApproved = hasAny(haystack, approvedTokens);

  const complete = hasAny(haystack, envTokens('KIRVANO_COMPLETE_MATCH', [
    'pacote completo', 'plano completo', 'dinamicas para catequese - plano completo', 'versao completa', 'versão completa'
  ]));

  const basic = complete || hasAny(haystack, envTokens('KIRVANO_BASIC_MATCH', [
    'pacote basico', 'pacote básico', 'plano basico', 'plano básico', 'dinamicas para catequese - plano basico', 'dinamicas para catequese - plano básico'
  ]));

  const activities365 = hasAny(haystack, envTokens('KIRVANO_365_MATCH', [
    '365 atividades', 'atividades infantis biblicas', 'atividades infantis bíblicas', '365 atividades infantis'
  ]));

  const unoDaFe = hasAny(haystack, envTokens('KIRVANO_UNO_MATCH', [
    'uno da fe', 'uno da fé'
  ]));

  const lifetime = hasAny(haystack, envTokens('KIRVANO_LIFETIME_MATCH', [
    'acesso vitalicio', 'acesso vitalício', 'vitalicio', 'vitalício', 'seu para sempre'
  ]));

  return {
    status_text: looksApproved ? 'approved_detected' : 'received_not_approved_detected',
    is_approved: looksApproved,
    basic_access: looksApproved && basic,
    complete_access: looksApproved && complete,
    activities365_access: looksApproved && activities365,
    uno_da_fe_access: looksApproved && unoDaFe,
    lifetime_access: looksApproved && lifetime,
  };
}

async function supabaseRequest(path, options = {}) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY ausente nas variáveis da Vercel.');
  }

  const response = await fetch(`${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }

  if (!response.ok) {
    throw new Error(`Supabase ${response.status}: ${typeof data === 'string' ? data : JSON.stringify(data)}`);
  }

  return data;
}

function tokenIsValid(req) {
  if (!KIRVANO_WEBHOOK_TOKEN) return true;
  const expected = KIRVANO_WEBHOOK_TOKEN.trim();
  const auth = req.headers.authorization || '';
  const candidates = [
    req.headers['x-webhook-token'],
    req.headers['x-kirvano-token'],
    req.headers['x-token'],
    req.query && req.query.token,
    auth.replace(/^Bearer\s+/i, ''),
    auth,
  ].filter(Boolean).map(String);
  return candidates.some((candidate) => candidate.trim() === expected || candidate.includes(expected));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    if (!tokenIsValid(req)) {
      return res.status(401).json({ ok: false, error: 'Token inválido' });
    }

    const payload = req.body || {};
    const access = detectAccess(payload);
    const email = findEmail(payload);
    const code = findCode(payload);
    const orderId = getOrderId(payload);
    const customerName = findByKey(payload, ['name', 'customer_name', 'buyer_name', 'client_name']);

    const row = {
      email: email || `sem-email-${Date.now()}@webhook.local`,
      code,
      customer_name: customerName || null,
      order_id: orderId,
      status_text: access.status_text,
      basic_access: access.basic_access,
      complete_access: access.complete_access,
      activities365_access: access.activities365_access,
      uno_da_fe_access: access.uno_da_fe_access,
      lifetime_access: access.lifetime_access,
      raw_payload: payload,
    };

    const saved = await supabaseRequest('order_access', {
      method: 'POST',
      body: JSON.stringify(row),
    });

    return res.status(200).json({ ok: true, saved: true, access, email: row.email, code: row.code, order_id: row.order_id, data: saved });
  } catch (error) {
    console.error('Kirvano webhook error:', error);
    return res.status(500).json({ ok: false, error: error.message || 'Erro interno' });
  }
}
