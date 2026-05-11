import crypto from 'node:crypto';

const COOKIE_NAME = 'catequese_session';

function getSecret() {
  return process.env.ACCESS_SESSION_SECRET || '';
}

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function normalizeCode(code) {
  const digits = String(code || '').replace(/\D/g, '');
  return digits.slice(-4);
}

function base64UrlEncode(value) {
  return Buffer.from(value).toString('base64url');
}

function base64UrlDecode(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function sign(payload) {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export function getCustomers() {
  const raw = process.env.ACCESS_CUSTOMERS_JSON || '[]';

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((customer) => ({
        email: normalizeEmail(customer.email),
        code: normalizeCode(customer.code || customer.last4 || customer.documentLast4 || customer.phoneLast4),
        plan: customer.plan || 'complete',
        name: customer.name || '',
      }))
      .filter((customer) => customer.email && customer.code.length === 4);
  } catch (error) {
    console.error('ACCESS_CUSTOMERS_JSON inválido:', error);
    return [];
  }
}

export function findCustomer(email, code) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedCode = normalizeCode(code);

  if (!normalizedEmail || normalizedCode.length !== 4) return null;

  return getCustomers().find(
    (customer) => customer.email === normalizedEmail && customer.code === normalizedCode,
  ) || null;
}

export function createSession(customer) {
  const days = Number(process.env.ACCESS_SESSION_DAYS || 365);
  const maxAge = Math.max(1, days) * 24 * 60 * 60;
  const payload = base64UrlEncode(JSON.stringify({
    email: customer.email,
    plan: customer.plan,
    name: customer.name,
    exp: Math.floor(Date.now() / 1000) + maxAge,
  }));
  const signature = sign(payload);
  return { token: `${payload}.${signature}`, maxAge };
}

export function readCookie(req, name = COOKIE_NAME) {
  const cookie = req.headers.cookie || '';
  return cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1) || '';
}

export function verifySessionToken(token) {
  if (!getSecret() || !token || !token.includes('.')) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) return null;
  if (!crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) return null;

  try {
    const data = JSON.parse(base64UrlDecode(payload));
    if (!data?.email || !data?.exp || data.exp < Math.floor(Date.now() / 1000)) return null;
    return { email: data.email, plan: data.plan || 'complete', name: data.name || '' };
  } catch {
    return null;
  }
}

export function setSessionCookie(res, token, maxAge) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${maxAge}`);
}

export function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`);
}

export { COOKIE_NAME };
