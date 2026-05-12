# Catequese Dinâmica — Webhook Kirvano + Supabase

Esta versão mantém a landing oficial e adiciona:

- `/api/kirvano/webhook` para receber compras da Kirvano
- `/api/order-access` para a página `/obrigado` consultar a compra
- página `/obrigado` liberando somente os materiais encontrados no Supabase
- rastreio de Plano Básico, Plano Completo e order bumps

## 1. Rodar SQL no Supabase

Abra o arquivo:

`SUPABASE-SQL-WEBHOOK-KIRVANO.sql`

Cole no Supabase em SQL Editor e clique em Run.

## 2. Variáveis na Vercel

Em Settings > Environment Variables, adicione:

```env
SUPABASE_URL=SUA_URL_DO_SUPABASE
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY_DO_SUPABASE
KIRVANO_WEBHOOK_TOKEN=
```

Para o primeiro teste, pode deixar `KIRVANO_WEBHOOK_TOKEN` vazio. Depois que funcionar, você pode colocar um token na Vercel e o mesmo token na Kirvano.

## 3. URL do webhook na Kirvano

Use esta URL:

```txt
https://dinamicascateque.vercel.app/api/kirvano/webhook
```

Selecione o evento de venda/pagamento aprovado e os produtos relacionados.

## 4. Página de obrigado

Use esta URL como página de obrigado:

```txt
https://dinamicascateque.vercel.app/obrigado
```

A página pede o e-mail da compra e libera o que estiver salvo no Supabase.

## 5. Atenção aos nomes dos produtos

O webhook detecta os produtos por texto. Ele procura por nomes como:

- Pacote Básico
- Pacote Completo
- 365 Atividades
- Uno da Fé
- Acesso Vitalício

Se na Kirvano o nome estiver muito diferente, ajuste usando variáveis opcionais:

```env
KIRVANO_BASIC_MATCH=nome exato do produto básico
KIRVANO_COMPLETE_MATCH=nome exato do produto completo
KIRVANO_365_MATCH=nome exato do bump 365
KIRVANO_UNO_MATCH=nome exato do bump uno
KIRVANO_LIFETIME_MATCH=nome exato do bump vitalício
```

Pode separar vários nomes por vírgula.
