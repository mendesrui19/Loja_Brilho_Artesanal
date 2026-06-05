# Instagram -> Site Sync (Producao)

Este setup deixa a sincronizacao 100% automatica no sentido correto:

- Instagram publica posts
- Site atualiza `instagram-feed.json` + `instagram-feed.js`
- Site nunca publica no Instagram

## 1) Pre-requisitos Meta

1. Conta Instagram profissional ligada a pagina Facebook.
2. App Meta com Instagram Graph API.
3. Permissoes recomendadas:
   - `instagram_basic`
   - `instagram_manage_comments` (para ler comentario mais recente)
4. Token de acesso valido (idealmente long-lived).
5. `IG_USER_ID` da conta.

## 2) Variaveis de ambiente

Copiar `.env.example` e configurar no ambiente onde o script corre:

- `IG_USER_ID`
- `IG_ACCESS_TOKEN`

## 3) Execucao manual

Na raiz do projeto:

```bash
IG_USER_ID="..." IG_ACCESS_TOKEN="..." node automation/sync-instagram-to-feed.mjs
```

Isto atualiza dois ficheiros:
- `instagram-feed.json` — usado pelo catalogo via `fetch()`
- `instagram-feed.js` — usado como fallback em `file://` (window.__IG_FEED__)

## 4) Paginacao completa

O script segue automaticamente o cursor `paging.next` da Graph API para
buscar **todos** os posts da conta, nao apenas os primeiros 100.

- Cada pagina pede ate 100 posts
- Delay de 500ms entre paginas (rate limiting)
- Delay de 200ms a cada 10 comentarios buscados
- Se uma pagina falhar, o script para a paginacao e usa o que ja foi buscado
- Output mostra progresso: paginas buscadas, total de posts, dedup final

## 5) n8n (agendado)

1. Importar `automation/n8n-workflow.json` no n8n.
2. Garantir que o n8n tem acesso a estas variaveis de ambiente:
   - `IG_USER_ID`
   - `IG_ACCESS_TOKEN`
3. Ativar o workflow.
4. O workflow corre a cada 15 minutos e atualiza o feed do site.

## 6) Regras aplicadas automaticamente

- Paginacao completa — busca todos os posts da conta
- Deduplicacao por `id` ou `permalink`
- Categoria automatica por hashtag/palavra-chave
- Fallback para categoria `outros`
- Descricao coerente no site baseada em legenda e comentario
- Output duplo: `.json` + `.js` (fallback file://)

## 7) Troubleshooting rapido

- Sem comentarios no feed: confirmar permissao `instagram_manage_comments`.
- Erro de token: renovar token long-lived.
- Sem novos posts no site: correr trigger manual no n8n e validar output do node "Run Instagram Sync".
- Paginacao parou antes do esperado: verificar rate limits ou erros no output do script.

