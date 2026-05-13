import { sendMetaEvent } from '../_meta.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = req.body || {};
    const eventName = body.event_name || 'PageView';
    const allowed = new Set(['PageView', 'ViewContent', 'Lead', 'InitiateCheckout', 'Purchase']);
    if (!allowed.has(eventName)) {
      return res.status(400).json({ ok: false, error: 'Evento não permitido.' });
    }

    const result = await sendMetaEvent({
      req,
      eventName,
      eventId: body.event_id,
      eventSourceUrl: body.event_source_url || req.headers.referer || 'https://dinamicascateque.vercel.app/',
      userData: {
        fbp: body.fbp,
        fbc: body.fbc,
        email: body.email,
        phone: body.phone,
        external_id: body.external_id,
      },
      customData: body.custom_data || {},
    });

    return res.status(200).json({ ok: true, meta: result });
  } catch (error) {
    console.error('Meta conversions endpoint error:', error);
    return res.status(500).json({ ok: false, error: error.message || 'Erro interno' });
  }
}
