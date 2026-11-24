# API do CineTrack

Base local: `http://localhost:3000`. As rotas que recebem dados usam JSON.

| Método | Caminho | Parâmetros ou corpo esperado | Respostas |
| --- | --- | --- | --- |
| GET | `/` | Nenhum | `200` |
| GET | `/filmes` | Query opcional `q` (busca por substring no título, sem diferenciar maiúsculas/minúsculas) e `status` (`assistido`, `assistindo` ou `quero`). Podem ser combinados. | `200` |
| GET | `/filmes/:id` | `id` numérico na URL | `200`, `404` |
| POST | `/filmes` | JSON de filme: `titulo`, `ano`, `genero`, `nota` e `status`; `poster` e `comentario` são opcionais. | `201`, `400` |
| PUT | `/filmes/:id` | `id` numérico na URL e JSON com os campos a atualizar. Os valores resultantes do merge com o filme atual são validados. | `200`, `400`, `404` |
| DELETE | `/filmes/:id` | `id` numérico na URL | `204`, `404` |
| GET | `/stats` | Nenhum | `200` |

## Validação de filmes

POST e PUT respondem `400` com todos os problemas encontrados no formato:

```json
{
  "erros": [
    "nota deve estar entre 1 e 5",
    "status deve ser assistido, assistindo ou quero"
  ]
}
```

O título e o gênero são obrigatórios, o ano deve estar entre 1888 e 2030, a nota entre 1 e 5 e o status deve ser um dos três valores listados acima.

## Estatísticas

`GET /stats` retorna o total de filmes, a contagem por status e a média das notas com uma casa decimal:

```json
{
  "total": 6,
  "porStatus": {
    "assistido": 3,
    "assistindo": 1,
    "quero": 2
  },
  "mediaNotas": 4.5
}
```
