Correção aplicada no pop-up de comprador

Antes, o pop-up podia aparecer só porque a pessoa abriu /obrigado no navegador.
Agora isso foi corrigido.

Novo comportamento:
- O pop-up NÃO aparece para visitantes comuns.
- O pop-up NÃO aparece apenas por abrir a landing page.
- O pop-up NÃO aparece apenas por visitar /obrigado.
- O pop-up só aparece se a API /api/order-access confirmar uma compra real salva no Supabase.

Como ele confirma:
1. O webhook da Kirvano precisa salvar a compra na tabela public.order_access.
2. A página /obrigado consulta o e-mail/order_id na API /api/order-access.
3. Se a compra for encontrada e houver algum material liberado, o site salva o e-mail do comprador no navegador.
4. Quando o comprador voltar para a home, o pop-up consulta novamente a API.
5. Se a API confirmar a compra real, aí sim o pop-up aparece.

Importante:
Para o pop-up funcionar corretamente, o webhook Kirvano + Supabase precisam estar configurados e gravando as compras na tabela order_access.

Depois de subir este ZIP, teste em janela anônima:
- Abrir a home sem compra: o pop-up não deve aparecer.
- Abrir /obrigado sem e-mail confirmado: o pop-up não deve aparecer na home.
- Fazer compra teste com webhook funcionando, liberar pelo e-mail em /obrigado e voltar para a home: o pop-up deve aparecer.
