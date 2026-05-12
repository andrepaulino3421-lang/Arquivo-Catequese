const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function last4Digits(value) {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length >= 4 ? digits.slice(-4) : '';
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

function mergeRows(rows) {
  return rows.reduce((acc, row) => ({
    basic: acc.basic || !!row.basic_access,
    complete: acc.complete || !!row.complete_access,
    activities365: acc.activities365 || !!row.activities365_access,
    unoDaFe: acc.unoDaFe || !!row.uno_da_fe_access,
    lifetimeAccess: acc.lifetimeAccess || !!row.lifetime_access,
  }), {
    basic: false,
    complete: false,
    activities365: false,
    unoDaFe: false,
    lifetimeAccess: false,
  });
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const email = normalizeEmail(req.query.email);
    const code = last4Digits(req.query.code || req.query.cpf || req.query.phone || '');
    const orderId = String(req.query.order_id || req.query.orderId || '').trim();

    if (!email && !orderId) {
      return res.status(400).json({ ok: false, error: 'Informe o e-mail da compra ou o order_id.' });
    }

    let query = 'order_access?select=*&order=created_at.desc&limit=20';
    if (orderId) {
      query += `&order_id=eq.${encodeURIComponent(orderId)}`;
    } else {
      query += `&email=eq.${encodeURIComponent(email)}`;
      if (code) query += `&code=eq.${encodeURIComponent(code)}`;
    }

    const rows = await supabaseRequest(query, { method: 'GET' });
    const access = mergeRows(Array.isArray(rows) ? rows : []);

    return res.status(200).json({
      ok: true,
      found: Array.isArray(rows) && rows.length > 0,
      access,
      count: Array.isArray(rows) ? rows.length : 0,
    });
  } catch (error) {
    console.error('Order access error:', error);
    return res.status(500).json({ ok: false, error: error.message || 'Erro interno' });
  }
}
