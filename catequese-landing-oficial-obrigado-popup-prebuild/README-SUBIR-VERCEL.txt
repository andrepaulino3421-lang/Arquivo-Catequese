VERSÃO PRÉ-BUILDADA - LANDING OFICIAL + PÁGINA DE OBRIGADO + POP-UP

Esta versão preserva a landing page oficial, com checkout, imagens, bônus e layout.
Também adiciona a página /obrigado e o pop-up de comprador.

Suba na raiz do GitHub somente:
- dist/
- vercel.json
- README-SUBIR-VERCEL.txt

NÃO suba package.json, src/ ou vite.config.ts junto com esta versão pré-buildada.

Configuração na Vercel:
Framework Preset: Other
Install Command: echo skip
Build Command: echo skip
Output Directory: dist

Depois clique em Redeploy > Redeploy without cache.

Links para testar depois do deploy:
https://SEU-SITE.vercel.app/
https://SEU-SITE.vercel.app/obrigado
https://SEU-SITE.vercel.app/?compra=ok

Observação:
Esta versão ainda não rastreia order bump automaticamente. Ela está preparada visualmente para isso.
O rastreamento real dos bumps será feito depois com webhook/API.
