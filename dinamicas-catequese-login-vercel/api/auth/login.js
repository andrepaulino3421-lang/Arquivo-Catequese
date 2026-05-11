import { createSession, findCustomer, normalizeCode, normalizeEmail, setSessionCookie } from './_shared.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Método não permitido.' });
  }

  const email = normalizeEmail(req.body?.email);
  const code = normalizeCode(req.body?.code);

  if (!email || code.length !== 4) {
    return res.status(400).json({ ok: false, message: 'Informe o e-mail da compra e os 4 últimos números.' });
  }

  const customer = findCustomer(email, code);

  if (!customer) {
    return res.status(401).json({ ok: false, message: 'Acesso não encontrado. Confira o e-mail e os 4 últimos dígitos usados na compra.' });
  }

  const { token, maxAge } = createSession(customer);
  setSessionCookie(res, token, maxAge);

  return res.status(200).json({
    ok: true,
    user: { email: customer.email, plan: customer.plan, name: customer.name },
  });
}
