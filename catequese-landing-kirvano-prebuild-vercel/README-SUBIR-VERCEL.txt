VERSÃO PRÉ-BUILDADA PARA VERCEL

Use esta versão quando a Vercel falhar no npm install com erro:
"Exit handler never called".

O que fazer:
1. Extraia este ZIP.
2. No GitHub, apague os arquivos antigos do repositório ou crie um repositório novo.
3. Suba os arquivos extraídos diretamente na raiz.

A raiz do repositório deve ficar assim:
- dist/
- vercel.json
- README-SUBIR-VERCEL.txt

Não suba a pasta inteira dentro de outra pasta.
Não precisa package.json, node_modules nem npm install.

Configuração na Vercel:
Framework Preset: Other
Install Command: echo Skipping install - using prebuilt dist
Build Command: echo Using prebuilt dist
Output Directory: dist

Links configurados:
Plano Básico: https://pay.kirvano.com/78cbb238-484f-4953-8810-f9653a8ee0d5
Plano Completo: https://pay.kirvano.com/0928fab2-2cf4-4919-82eb-883984011d96
