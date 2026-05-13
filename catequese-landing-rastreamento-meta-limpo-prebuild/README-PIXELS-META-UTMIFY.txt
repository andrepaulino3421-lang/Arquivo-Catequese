Pixels adicionados no site

1. Meta Pixel browser-side
- Pixel ID: 1600334731039208
- Evento PageView configurado no index.html.
- Usa eventID para deduplicar com o PageView enviado pela API de Conversões.

2. Utmify Pixel
- Pixel ID: 6a03e88e68448643247a56ff
- Script instalado no index.html.

3. Meta API de Conversões / CAPI
Foi criado o endpoint:
/api/meta/conversions

Ele recebe PageView do navegador e envia para a Meta pelo servidor.

Também foi integrado ao webhook da Kirvano:
/api/kirvano/webhook

Quando uma venda aprovada chega pelo webhook, o sistema tenta enviar evento Purchase pela API de Conversões da Meta.

IMPORTANTE: rastreamento limpo para nicho sensível
O Purchase continua sendo enviado, mas agora sem nome do produto, sem categoria religiosa, sem nome do plano e sem nome dos order bumps.
A Meta recebe apenas dados neutros necessários para otimização, principalmente value e currency.

IMPORTANTE NA VERCEL
Adicione estas variáveis em Project Settings > Environment Variables:

META_PIXEL_ID=1600334731039208
META_CAPI_ACCESS_TOKEN=cole_o_token_da_api_de_conversao_da_meta_aqui

Não coloque o token no HTML público. O token deve ficar somente nas variáveis da Vercel.

As variáveis antigas do webhook/Supabase continuam necessárias:
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
KIRVANO_WEBHOOK_TOKEN

Depois de salvar as variáveis, faça Redeploy without cache.
