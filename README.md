# Aplicação simples com Docker Compose

Aplicação para cadastro de produtos composta por:

- **Frontend:** HTML, CSS e JavaScript servidos pelo Nginx;
- **Backend:** API desenvolvida com FastAPI e Python;
- **Banco de dados:** PostgreSQL.

## Estrutura do projeto

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

## Acesso aos serviços

| Serviço | Endereço |
| --- | --- |
| Frontend | <http://localhost:8080> |
| Backend/API | <http://localhost:8000> |
| Documentação da API | <http://localhost:8000/docs> |
| PostgreSQL | `localhost:5432` |

## Principais comandos do Docker Compose

Os comandos devem ser executados na pasta que contém o arquivo `docker-compose.yml`.

### Criar e controlar os containers

| Comando | Descrição | Exemplo |
| --- | --- | --- |
| `docker compose up` | Cria e inicia os containers, exibindo os logs no terminal. | `docker compose up` |
| `docker compose up -d` | Cria e inicia os containers em segundo plano. | `docker compose up -d` |
| `docker compose stop` | Para os containers sem removê-los. | `docker compose stop` |
| `docker compose start` | Inicia containers existentes que estejam parados. | `docker compose start` |
| `docker compose restart` | Reinicia os containers. | `docker compose restart backend` |
| `docker compose down` | Para e remove os containers e as redes criadas pelo Compose. | `docker compose down` |
| `docker compose kill` | Encerra os containers imediatamente. | `docker compose kill backend` |
| `docker compose rm` | Remove containers que já estão parados. | `docker compose rm -f` |

### Consultar containers, logs e processos

| Comando | Descrição | Exemplo |
| --- | --- | --- |
| `docker compose ps` | Lista os containers do projeto e seus estados. | `docker compose ps` |
| `docker compose logs` | Exibe os logs dos serviços. | `docker compose logs backend` |
| `docker compose logs -f` | Acompanha os logs em tempo real. | `docker compose logs -f backend` |
| `docker compose top` | Exibe os processos em execução nos containers. | `docker compose top` |
| `docker compose images` | Lista as imagens utilizadas pelos containers. | `docker compose images` |
| `docker compose config` | Valida e exibe a configuração final do Compose. | `docker compose config` |

### Trabalhar com imagens

| Comando | Descrição | Exemplo |
| --- | --- | --- |
| `docker compose build` | Constrói as imagens dos serviços definidos com `build`. | `docker compose build backend` |
| `docker compose pull` | Baixa as imagens dos serviços a partir de um registry. | `docker compose pull db` |
| `docker compose push` | Envia ao registry as imagens que possuem a propriedade `image`. | `docker compose push` |

### Executar comandos nos serviços

| Comando | Descrição | Exemplo |
| --- | --- | --- |
| `docker compose exec` | Executa um comando em um container que já está em execução. | `docker compose exec backend python --version` |
| `docker compose run` | Cria um novo container temporário para executar um comando. | `docker compose run --rm backend python --version` |

### Sincronizar alterações

| Comando | Descrição | Exemplo |
| --- | --- | --- |
| `docker compose watch` | Monitora alterações e executa as ações configuradas na seção `develop` dos serviços. | `docker compose watch` |

> O comando `watch` exige que as regras de desenvolvimento estejam configuradas no arquivo Compose.

## Parâmetros úteis

| Parâmetro | Função | Exemplo |
| --- | --- | --- |
| `-d` | Executa os containers em segundo plano. | `docker compose up -d` |
| `-f arquivo.yml` | Usa um arquivo Compose diferente do padrão. | `docker compose -f compose.dev.yml up` |
| `--build` | Reconstrói as imagens antes de iniciar os containers. | `docker compose up --build` |
| `--force-recreate` | Força a recriação dos containers, mesmo sem alterações. | `docker compose up -d --force-recreate` |
| `--no-cache` | Constrói as imagens sem utilizar o cache. | `docker compose build --no-cache` |
| `-v` | Com `down`, remove também os volumes declarados no Compose. | `docker compose down -v` |
| `--remove-orphans` | Remove containers de serviços que não estão definidos no arquivo atual. | `docker compose down --remove-orphans` |
| `--scale` | Define a quantidade de containers de um serviço. | `docker compose up -d --scale backend=3` |

> O uso de `--scale` pode exigir ajustes de portas e balanceamento de carga. Neste projeto, `container_name` e a porta fixa do backend impedem a criação direta de várias instâncias desse serviço.

## Combinações frequentes

```bash
# Construir as imagens e iniciar a aplicação em segundo plano
docker compose up -d --build

# Acompanhar os logs de todos os serviços
docker compose logs -f

# Reiniciar somente o backend
docker compose restart backend

# Encerrar a aplicação sem apagar os dados do banco
docker compose down

# Encerrar a aplicação e remover também os dados persistidos nos volumes
docker compose down -v
```
