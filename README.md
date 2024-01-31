# Api de compras

Este projeto é uma parte de um projeto maior, um ecommerce baseado em microserviços.

![Arquitetura](https://gitlab.com/bigenterprise/serverless/handler-eventos/-/blob/develop/imagens/Captura%20de%20tela%202024-01-25%20215933.png?ref_type=heads)

Este repositório se refere api de compras, criação e execução de ordems de compra

Este serviço visa tratar dados referentes as compras.

Os demais serviços que compoem o projeto podem ser baixados em cada um dos respectivos repositórios, sendo eles:

Frontend:
Api de compras:
Api de produtos:

## Preparação

### Requisitos

Estem alguns requisots básicos para a execuçao do projeto em ambiente local. Uma delas é o docker para execução dos containers,
que pode ser baixado gratuitamente em https://www.docker.com/

Uma vez intalado e configurado o docker, execute os seguintes comandos dentro da pasta raíz do serviço

```bash
docker-compose up --build
```

isso irá subir um banco de daos mysql para execução da aplicação.
Para validar se o banco está de pé, execute os camandos em sequencia

```bash
docker compose exec db bash
```

```bash
mysql -uroot -proot
```

```bash
show databases;
```

procure pelo banco "commerce" ou pelo banco que você definiu nas variaveis de ambiente

### RabbitMQ

As ordems de compra não são executas imediatamente, para garantir a robustes do serviço, foi criado um broker de mensagens com rabbitmq de forma a transoforma uma execução sincrona em assincrona, como é de se esperar no mercado.

O comando de subida dos containers subirá um container do rabbitmq.
Para validar se o serviço está ok acesso a url

http://localhost:15672

A configuração de filas deve ser feita na abba "queues an streams", crie uma fila chamada 
"microservico_pagamentos com exchange "amq.direct"

Feito isso, você verá uma tela nesse formato:

![rabbitmq](https://github.com/matheusgit1/orders-api/blob/main/assets/rabbitmq-config.png)

## Stack utilizada

Docker, Rabbitmq, Nestjs, Typescript, JavaScript, TypeORM, Shell

## Testes unitário

Use o arquivo api.http para execução das rotas no vscode, ou, use a collection postman disponibilizada nesse repositório em COLLECTION e COLLECTION_ENVIRONMENT para execução manual

para a criação instantanea de alguns dados na base use o comando abaixo

```bash
npm run fixture
```

ou

```bash
yarn fixture
```

## Arquitetura implementada

### Arquitetura geral do projeto

![Arquitetura](https://gitlab.com/bigenterprise/serverless/handler-eventos/-/blob/develop/imagens/Captura%20de%20tela%202024-01-25%20215933.png?ref_type=heads)

### Arquitetura geral do serviço

![servico](https://github.com/matheusgit1/orders-api/blob/main/assets/arquitetura%20do%20projeto.png)

## Sobre o Autor

Eu sou uma pessoa desenvolvedora full-stack, técnico em administração, engenheiro de automação em formação, e cientista de dados em formação. Sempre busco por excelência e entregar o máximo com a maior qualidade, sem claro, deixar de lado boas práticas.

Atualmente sou desenvolvedor full stack júnior da área de desenvolvimento de softwares, mirando senioridades cada vez mais altas.

Tenho habilidades com as stacks mais modernas, como :nodeJS, typeScript, css, html, nestJs, NextJs, aws-cloud, bancos de dados não relacionais como mongodb e redis, bancos de dados relacionais como MySql, postgres, docker, testes unitários e de integração. Atuando também em diferentes setores, como educação e telecomunicação.

## Quer entrar em contato com o desenvolvedor?

🪜 Instagram (sempre respondo): @ap_matheus

📱 Telefone e whatsapp: 55 27 997822665

📫 Email: pereira.matheusalves@gmail.com

🔗 Linkedin: https://www.linkedin.com/in/matheus-alves-pereira-4b3781222/

## Documentação da API

### Teste

#### Valida se o serviço está operacional

```http
  GET /
```

Retorno esperado:

```JSON
Hello World!
```

#### Autenticacao

```http
  POST /auth/login/
```

body da requisição no formato JSON

| Parâmetro   | Tipo       | Descrição                              |
| :----------- | :--------- | :--------------------------------------- |
| `username` | `string` | **Obrigatório**. nome de usuario  |
| `password` | `string` | **Obrigatório**. senha de usuario |

Retorno esperado:

```JSON
{
    "access_token":"access_token"
}
```

Token de acesso usado nas rotas autenticadas.
use o header

```JSON
"Authorization": "Bearer  \"access_token\""
```

Todas as rotas abaixo são autenticadas

### Produtos

#### Cria um produto na base

```http
  POST /products/
```

body da requisição no formato JSON

| Parâmetro      | Tipo       | Descrição                                    |
| :-------------- | :--------- | :--------------------------------------------- |
| `name`        | `string` | **Obrigatório**. nome de produto        |
| `description` | `string` | **Obrigatório**. descrição de produto |
| `image_url`   | `string` | **Obrigatório**. imagem do produto      |
| `price`       | `number` | **Obrigatório**. Preço do produto      |

Retorno esperado:

```JSON
{
    "name": "produto 1",
    "description": "descrição produto 1",
    "image_url": "image_url",
    "price": 2,
    "id": "1edf0461-8a8a-48a2-9641-0512686dfc7b"
}
```

#### Lista todos os produtos

```http
  GET /products/
```

body da requisição no formato JSON

Retorno esperado:

```JSON
[
    {
        "id": "03810712-ea47-4892-90ee-ea8528246d59",
        "name": "produto 1",
        "description": "descrição produto 1",
        "image_url": "image_url",
        "price": 2,
        "active_status": true
    },
    {
        "id": "1edf0461-8a8a-48a2-9641-0512686dfc7b",
        "name": "produto 1",
        "description": "descrição produto 1",
        "image_url": "image_url",
        "price": 2,
        "active_status": true
    }
]
```

#### Lista um produto por id

```http
  GET /products/:product_id
```

**product_id** deve ser passado como parametro da url

Retorno esperado:

```JSON
{
    "id": "03810712-ea47-4892-90ee-ea8528246d59",
    "name": "produto 1",
    "description": "descrição produto 1",
    "image_url": "image_url",
    "price": 2,
    "active_status": true
}
```

#### Atualiza um produto na base

```http
  PATCH /products/:product_id
```

**product_id** deve ser passado como parametro da url

| Parâmetro      | Tipo       | Descrição                                |
| :-------------- | :--------- | :----------------------------------------- |
| `name`        | `string` | **Opcional**. nome de produto        |
| `description` | `string` | **Opcional**. descrição de produto |
| `image_url`   | `string` | **Opcional**. imagem do produto      |
| `price`       | `number` | **Opcional**. Preço do produto      |

Retorno esperado:

```JSON
{
    "generatedMaps": [],
    "raw": [],
    "affected": 1
}
```

#### Deleta um produto na base

```http
  DELETE /products/:product_id
```

**product_id** deve ser passado como parametro da url

Retorno esperado:

```JSON

```

No content

### Ordens (compras)

#### Cria uma ordem de comrpra

```http
  POST /orders/
```

body da requisição no formato JSON

| Parâmetro    | Tipo       | Descrição                                         |
| :------------ | :--------- | :-------------------------------------------------- |
| `card_hash` | `string` | **Obrigatório**. hash de cartão de crédito |
| `items`     | `Array`  | **Obrigatório**. array de items              |

items devem ter o seguinte formato

| `quantity`      | `number` | **Obrigatório**. quantidade de items |
| `product_id`      | `string` | **Obrigatório**. id de produto |

exemplo

```JSON
{
    "card_hash":"card_hash",
    "items": [
        {
            "quantity": 7,
            "product_id": "03810712-ea47-4892-90ee-ea8528246d59"
        },
        {
            "quantity": 1,
            "product_id": "1edf0461-8a8a-48a2-9641-0512686dfc7b"
        },
        {
            "quantity": 12,
            "product_id": "2546c91a-b96b-4894-beb3-67791a3e023c"
        },
        {
            "quantity": 10,
            "product_id": "27b219cc-ee83-44fb-b649-34abf520fddd"
        }
    ]
}

```

Retorno esperado:

```JSON

```

No content

#### Listar todas as ordems

```http
  GET /orders/
```

retorno esperado

```JSON
[
    {
        "status": "pending",
        "id": "901dffdc-64bc-4b4c-8eaf-bd840d349a9d",
        "total": "204.00",
        "client_id": 1,
        "created_at": "2024-02-01T02:00:09.365Z"
    },
    {
        "status": "pending",
        "id": "af71029e-d564-44dc-b6bd-d406cc0395d5",
        "total": "236.00",
        "client_id": 1,
        "created_at": "2024-02-01T02:00:24.945Z"
    }
]

```

#### Listar uma unica ordem

```http
  GET /orders/:order_id
```

**order_id** deve ser passado como parametro da url

retorno esperado

```JSON
{
    "status": "pending",
    "id": "901dffdc-64bc-4b4c-8eaf-bd840d349a9d",
    "total": "204.00",
    "client_id": 1,
    "created_at": "2024-02-01T02:00:09.365Z"
}
```

#### add(num1, num2)

Recebe dois números e retorna a sua soma.
