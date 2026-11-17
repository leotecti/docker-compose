# Aplicação simples com Docker Compose

Aplicação de cadastro de produtos com:

- Frontend: HTML, CSS e JavaScript servido por Nginx
- Backend: FastAPI em Python
- Banco de dados: PostgreSQL

## Estrutura

```text
produtos-docker-app/
├── backend/
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── docker-compose.yml
└── README.md
```

## Como executar

Entre na pasta do projeto e execute:

```bash
docker compose up --build
```

Depois acesse:

```text
http://localhost:8080
```

## Serviços

- Frontend: http://localhost:8080
- Backend/API: http://localhost:8000
- Documentação da API: http://localhost:8000/docs
- PostgreSQL: localhost:5432

## Encerrar a aplicação

```bash
docker compose down
```

## Encerrar e apagar os dados do banco

```bash
docker compose down -v
```
