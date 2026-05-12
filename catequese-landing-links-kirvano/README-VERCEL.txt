Configuração para subir na Vercel

Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Root Directory: deixe vazio se o package.json estiver na raiz do repositório.

Correção aplicada:
- Removida a dependência quebrada motion/react do componente SalesPopup.
- O popup de venda agora usa React + CSS/Tailwind, sem pacote externo ausente.
- Isso corrige o erro de build que acontecia no npm run build.

Importante:
- Extraia este ZIP.
- Suba os arquivos extraídos para a raiz do repositório no GitHub.
- Não suba o ZIP fechado.
