Versão pré-buildada para Vercel

Suba somente estes arquivos/pastas na raiz do GitHub:
- dist/
- api/
- package.json
- vercel.json
- SUPABASE-SQL-WEBHOOK-KIRVANO.sql
- READMEs

Configuração Vercel:
Framework Preset: Other
Install Command: echo skip
Build Command: echo skip
Output Directory: dist

Variáveis necessárias na Vercel:
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
KIRVANO_WEBHOOK_TOKEN
META_PIXEL_ID
META_CAPI_ACCESS_TOKEN

Depois de salvar, faça Redeploy without cache.
