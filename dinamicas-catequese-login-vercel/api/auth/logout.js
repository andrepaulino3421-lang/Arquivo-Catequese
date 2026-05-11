import { clearSessionCookie } from './_shared.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  clearSessionCookie(res);
  return res.status(200).json({ ok: true });
}
