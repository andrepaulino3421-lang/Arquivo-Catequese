import { readCookie, verifySessionToken } from './_shared.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false });
  }

  const token = readCookie(req);
  const user = verifySessionToken(token);

  if (!user) {
    return res.status(401).json({ ok: false });
  }

  return res.status(200).json({ ok: true, user });
}
