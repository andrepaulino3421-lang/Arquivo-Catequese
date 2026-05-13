Rastreamento limpo para Meta - Nicho sensível

Alteração feita com cuidado para não remover conversões:

Mantido:
- Meta Pixel browser-side
- PageView
- API de Conversões / CAPI
- Purchase via webhook Kirvano
- event_id para deduplicação
- value
- currency
- Utmify Pixel

Removido do envio para a Meta:
- Nome do produto
- Categoria do produto
- Termos religiosos
- Nome do plano
- Nome dos bônus/order bumps
- Flags de acesso aos bônus
- Descrições da oferta

Agora o Purchase enviado para a Meta fica neutro, exemplo:
{
  "event_name": "Purchase",
  "custom_data": {
    "currency": "BRL",
    "value": 27.90
  }
}

A liberação dos planos e bumps no Supabase continua igual.
A landing, checkout, visual, webhook e Utmify não foram removidos.
