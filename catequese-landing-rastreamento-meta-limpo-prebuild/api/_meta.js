import crypto from 'crypto';

const DEFAULT_META_PIXEL_ID = '1600334731039208';

function normalizeForHash(value) {
  return String(value || '').trim().toLowerCase();
}

export function sha256(value) {
  const normalized = normalizeForHash(value);
  if (!normalized) return undefined;
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

export function normalizePhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length >= 12) return digits;
  // Brazil fallback when phone is local/national without country prefix.
  if (digits.length >= 10 && digits.length <= 11) return `55${digits}`;
  return digits;
}

export function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) return forwarded.split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || '';
}

export function parseNumericValue(value) {
  if (value === null || value === undefined || value === '') return undefined;
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  const text = String(value).replace(/[^\d.,-]/g, '').trim();
  if (!text) return undefined;
  const normalized = text.includes(',') ? text.replace(/\./g, '').replace(',', '.') : text;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : undefined;
}

export function findValueByKey(input, wantedKeys) {
  const stack = [input];
  const wanted = wantedKeys.map((key) => String(key).toLowerCase());
  while (stack.length) {
    const item = stack.shift();
    if (!item || typeof item !== 'object') continue;
    if (Array.isArray(item)) {
      stack.push(...item);
      continue;
    }
    for (const [key, value] of Object.entries(item)) {
      const nKey = String(key).toLowerCase();
      if (wanted.some((wantedKey) => nKey === wantedKey || nKey.includes(wantedKey))) {
        if (typeof value !== 'object') return value;
      }
      if (value && typeof value === 'object') stack.push(value);
    }
  }
  return undefined;
}

export function getPurchaseValue(payload, fallbackValue) {
  const value = findValueByKey(payload, [
    'total_amount', 'amount_total', 'total', 'value', 'price', 'paid_amount', 'payment_amount', 'transaction_amount', 'amount'
  ]);
  const parsed = parseNumericValue(value);
  return parsed ?? fallbackValue;
}

export function buildUserData(req, input = {}) {
  const phone = normalizePhone(input.phone || input.ph || '');
  const userData = {
    client_ip_address: input.client_ip_address || getClientIp(req),
    client_user_agent: input.client_user_agent || req.headers['user-agent'] || '',
    fbp: input.fbp || undefined,
    fbc: input.fbc || undefined,
    em: input.email ? [sha256(input.email)] : undefined,
    ph: phone ? [sha256(phone)] : undefined,
    external_id: input.external_id ? [sha256(input.external_id)] : undefined,
  };

  return Object.fromEntries(Object.entries(userData).filter(([, value]) => {
    if (Array.isArray(value)) return value.some(Boolean);
    return Boolean(value);
  }));
}


export function sanitizeMetaCustomData(eventName, customData = {}) {
  // Rastreamento limpo para nichos sensíveis: mantém apenas dados neutros
  // necessários para mensuração/otimização, sem nome de produto, categoria,
  // termos religiosos, flags de bônus ou descrições da oferta.
  const safe = {};

  if (customData.currency) {
    safe.currency = String(customData.currency).slice(0, 8).toUpperCase();
  }

  const value = parseNumericValue(customData.value);
  if (value !== undefined) {
    safe.value = value;
  }

  // Mantém num_items apenas se algum evento futuro precisar, sem revelar produto.
  const numItems = parseNumericValue(customData.num_items);
  if (numItems !== undefined) {
    safe.num_items = numItems;
  }

  // Para PageView, Lead, ViewContent e InitiateCheckout, não enviamos parâmetros
  // descritivos por padrão. O PageView já é suficiente para visitas.
  // Para Purchase, value/currency são os campos importantes para otimização.
  return safe;
}

export async function sendMetaEvent({ req, eventName, eventId, eventSourceUrl, userData = {}, customData = {} }) {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN || process.env.FACEBOOK_CAPI_ACCESS_TOKEN || '';
  const pixelId = process.env.META_PIXEL_ID || DEFAULT_META_PIXEL_ID;

  if (!accessToken) {
    console.warn('META_CAPI_ACCESS_TOKEN ausente. Evento CAPI ignorado:', eventName);
    return { ok: false, skipped: true, reason: 'missing_token' };
  }

  const event = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId || `${eventName}_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    action_source: 'website',
    event_source_url: eventSourceUrl || 'https://dinamicascateque.vercel.app/',
    user_data: buildUserData(req, userData),
    custom_data: sanitizeMetaCustomData(eventName, customData),
  };

  const response = await fetch(`https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [event] }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    console.error('Meta CAPI error:', response.status, data);
    return { ok: false, status: response.status, data, event_id: event.event_id };
  }

  return { ok: true, status: response.status, data, event_id: event.event_id };
}
