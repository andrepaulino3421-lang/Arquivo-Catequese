Versão pré-buildada para Vercel com pixels

Suba estes arquivos na raiz do GitHub:
- dist/
- api/
- vercel.json
- package.json
- env-example.txt
- README-PIXELS-META-UTMIFY.txt
- README-WEBHOOK-KIRVANO-SUPABASE.txt
- SUPABASE-SQL-WEBHOOK-KIRVANO.sql

Configuração Vercel:
Framework Preset: Other
Install Command: echo skip
Build Command: echo skip
Output Directory: dist

Variáveis obrigatórias para webhook/Supabase:
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
KIRVANO_WEBHOOK_TOKEN

Variáveis obrigatórias para API de Conversões da Meta:
META_PIXEL_ID=1600334731039208
META_CAPI_ACCESS_TOKEN=cole_o_token_da_api_de_conversao_da_meta_aqui

Depois de adicionar as variáveis, faça Redeploy without cache.
