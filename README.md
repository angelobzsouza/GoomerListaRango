# GOOMER LISTA RANGO

A Goomer Lista Rango é uma RESTful API criada em Node.js para o processo seletivo de desenvolvedor Back-End da Goomer. Através da API, o usuário pode gerenciar restaurantes e seus produtos.

---

# Inicialização

Para inciar a API é necessário instalar o [Node.js](https://nodejs.org/en/) e o [MongoDb](https://www.mongodb.com/). O processo de instalção de ambos é descrito em seus respectivos sites. Além disso, também é necessário instalar o [npm](https://www.npmjs.com/get-npm) para a instalção dos demais pacotes.

Tendo estes requisitos instalados, vá até a pasta do projeto e execute o seguinte comando:
```sh
$ node index.js
```
Caso o servidor tenha sido iniciado normalmente e a API esteja funcionando, o console apresentará a seguinte mensagem:
```sh
API iniciada na porta {PORT}
```

---

# Uso

### Rota:

    GET /api/restaurantes
    
Busca todos os restaurantes cadastrados no sistema.

### Parâmtros:

Essa rota não recebe nenhum parâmtro

### Retorno:
```javascript
[{
    _id: ObjectId,
    "nome": String,
    "endereco": String,
    "foto": String,
    "funcionamento": [{
        _id: ObjectId,
        "primeiroDia": String,
        "ultimoDia": String,
        "horarioInicio": String,
        "horarioFim": String
    }],
    _v: Number
}]    
```
### Exemplo:
```javascript
[{
    _id: "5cb61abecf59132e801daa3e",
    "nome": "Restaurante 1",
    "endereco": "Av. Teste",
    "foto": "https://goomer.com.br/public/foto.png",
    "funcionamento": [{
        _id: "5cb61abecf59132e801daa3f",
        "primeiroDia": "Seg",
        "ultimoDia": "Ter",
        "horarioInicio": "10:00",
        "horarioFim": "18:00"
    }],
    _v: 0
}]    
```

### Erros:

- Caso nenhum restaurante seja encontrado:
```javascript
{
    Erro: "Nenhum restaurante foi encontrado." 
}
```
---
### Rota:

    GET /api/restaurantes/{IDRestaurante}
Busca um determinado restaurante no sistema.

### Parâmtros:
Parametro recebido por GET
| Nome | Tipo | Obrigatório | Descricao |
| ------ | ------ | ------ | ------ |
| IDRestaurante | String | Sim | ID do restaurante que está sendo buscado


### Retorno:
```javascript
{
    _id: ObjectId,
    "nome": String,
    "endereco": String,
    "foto": String,
    "funcionamento": [{
        _id: ObjectId,
        "primeiroDia": String,
        "ultimoDia": String,
        "horarioInicio": String,
        "horarioFim": String
    }],
    _v: Number
}
```
### Exemplo:
```javascript
[{
    _id: "5cb61abecf59132e801daa3e",
    "nome": "Restaurante 1",
    "endereco": "Av. Teste",
    "foto": "https://goomer.com.br/public/foto.png",
    "funcionamento": [{
        _id: "5cb61abecf59132e801daa3f",
        "primeiroDia": "Seg",
        "ultimoDia": "Ter",
        "horarioInicio": "10:00",
        "horarioFim": "18:00"
    }],
    _v: 0
}]    
```

### Erros:

- Caso nenhum restaurante seja encontrado:
```javascript
{
    Erro: "Nenhum restaurante foi encontrado." 
}
```
---
### Rota:

    POST /api/restaurantes
Insere um novo restaurante no banco.

### Parâmtros:

| Nome | Tipo | Obrigatório | Descricao |
| ------ | ------ | ------ | ------ |
| nome | String | Sim | Nome do restaurante
| endereco | String | Sim | Endereço do restaurante
| foto | File | Não | Logo do restaurante
| funcionamento | Object Funcionamento | Sim | Horário de funcionamento do restaurante

### Parâmetros Object Funcionamento:

| Nome | Tipo | Obrigatório| Descricao |
| ------ | ------ | ------ | ------ |
| primeiroDia | String: "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom" | Sim | Primeiro dia deste horário de funcionamento 
| ultimoDia | String: "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom" | Sim | Ultimo dia deste horário de funcionamento
| horarioInicio | String | Sim | Horario de abertura do restaurante do intervalo de dias inserido
| horarioFim | String | Sim | Horário de fechamento do restaurante para os dias inseridos

### Retorno:
Retorna o restaurante inserido
```javascript
[{
    _id: ObjectId,
    "nome": String,
    "endereco": String,
    "foto": String,
    "funcionamento": [{
        _id: ObjectId,
        "primeiroDia": String,
        "ultimoDia": String,
        "horarioInicio": String,
        "horarioFim": String
    }],
    _v: Number
}]    
```
### Exemplo:
```javascript
{
    _id: "5cb61abecf59132e801daa3e",
    "nome": "Restaurante 1",
    "endereco": "Av. Teste",
    "foto": "https://goomer.com.br/public/foto.png",
    "funcionamento": [
        {
            _id: "5cb61abecf59132e801daa3f",
            "primeiroDia": "Seg",
            "ultimoDia": "Ter",
            "horarioInicio": "10:00",
            "horarioFim": "18:00"
        }
        {
            _id: "5cb61abecf59132e802dse4g",
            "primeiroDia": "Sab",
            "ultimoDia": "Dom",
            "horarioInicio": "12:00",
            "horarioFim": "20:00"
        }
    ],
    _v: 0
}   
```

### Erros:
- Caso o horário inserido seja invalido:
```javascript
{
    Erro: "Horário de funcionamento inválido" 
}
```
- Caso algum campo obrigatório esteja nulo:
```javascript
{
    Campo: "{nome do campo}"
    Erro: "O campo {nome do campo} é obrigatório" 
}
```
---

### Rota:

    PUT /api/restaurantes/{IDRestaurante}
Atualiza as informações de um determinado restaurante.

### Parâmtros:

Os parametros que não são enviados, são mantidos com o valor inserido anteriormente.
| Nome | Tipo | Obrigatório | Descricao |
| ------ | ------ | ------ | ------ |
| IDRestaurante | String | Sim | Id do restaurante que está sendo alterado
| nome | String | Nao | Nome do restaurante
| endereco | String | Nao | Endereço do restaurante
| foto | File | Não | Logo do restaurante
| funcionamento | Object Funcionamento | Nao | Horário de funcionamento do restaurante

### Parâmetros Object Funcionamento:

| Nome | Tipo | Obrigatório| Descricao |
| ------ | ------ | ------ | ------ |
| primeiroDia | String: "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom" | Sim | Primeiro dia deste horário de funcionamento 
| ultimoDia | String: "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom" | Sim | Ultimo dia deste horário de funcionamento
| horarioInicio | String | Sim | Horario de abertura do restaurante do intervalo de dias inserido
| horarioFim | String | Sim | Horário de fechamento do restaurante para os dias inseridos

### Retorno:
Retorna o restaurante atualizado
```javascript
[{
    _id: ObjectId,
    "nome": String,
    "endereco": String,
    "foto": String,
    "funcionamento": [{
        _id: ObjectId,
        "primeiroDia": String,
        "ultimoDia": String,
        "horarioInicio": String,
        "horarioFim": String
    }],
    _v: Number
}]    
```
### Exemplo:
```javascript
{
    _id: "5cb61abecf59132e801daa3e",
    "nome": "Novo Nome do Restaurante",
    "endereco": "Av. Teste",
    "foto": "https://goomer.com.br/public/foto.png",
    "funcionamento": [
        {
            _id: "5cb61abecf59132e801daa3f",
            "primeiroDia": "Seg",
            "ultimoDia": "Ter",
            "horarioInicio": "10:00",
            "horarioFim": "18:00"
        }
    ],
    _v: 0
}   
```

### Erros:
- Caso o restaurante não tenha sido encontrado:
```javascript
{
    Erro: "Restaurante não encontrado" 
}
```
- Caso o horário inserido seja invalido:
```javascript
{
    Erro: "Horário de funcionamento inválido" 
}
```
- Caso algum campo obrigatório não tenha sido inserido:
```javascript
{
    Campo: "{campo},"
    Erro: "O campo {campo} é obrigatório"
}
```
---
### Rota:

    DELETE /api/restaurantes/{IDRestaurante}
Exclui um restaurante do sistema

### Parâmtros:

| Nome | Tipo | Obrigatório | Descricao |
| ------ | ------ | ------ | ------ |
| IDRestaurante | String | Sim | Id do restaurante que está sendo removido

### Retorno:
Retorna o restaurante removido
```javascript
[{
    _id: ObjectId,
    "nome": String,
    "endereco": String,
    "foto": String,
    "funcionamento": [{
        _id: ObjectId,
        "primeiroDia": String,
        "ultimoDia": String,
        "horarioInicio": String,
        "horarioFim": String
    }],
    _v: Number
}]    
```
### Exemplo:
```javascript
{
    _id: "5cb61abecf59132e801daa3e",
    "nome": "Novo Nome do Restaurante",
    "endereco": "Av. Teste",
    "foto": "https://goomer.com.br/public/foto.png", 
    "funcionamento": [
        {
            _id: "5cb61abecf59132e801daa3f",
            "primeiroDia": "Seg",
            "ultimoDia": "Ter",
            "horarioInicio": "10:00",
            "horarioFim": "18:00"
        }
    ],
    _v: 0
}   
```

### Erros:
- Caso o restaurante não tenha sido encontrado:
```javascript
{
    Erro: "Restaurante não encontrado" 
}
```
---
### Rota:

    GET /api/produtos/{IDRestaurante}
Busca toodos os produtos de um determinado restaurante

### Parâmtros:

Parametro recebido por GET
| Nome | Tipo | Obrigatório | Descricao |
| ------ | ------ | ------ | ------ |
| IDRestaurante | String | Sim | ID do restaurante pelo qual os produtos são vendidos


### Retorno:
```javascript
[{
    "_id": ObjectId,
    "nome": String,
    "preco": Number,
    "categoria": String,
    "IDRestaurante": ObjectId,
    "foto": String,
    "promocao": {
        "_id": ObjectId,
        "descricao": String,
        "preco": Number,
        "diasPromocao": [
            {
                "_id": ObjectId,
                "primeiroDia": String,
                "ultimoDia": String,
                "horarioInicio": String,
                "horarioFim": String
            }
        ]
    },
    "__v": 0
}]
```
### Exemplo:
```javascript
[{
    "_id": "5cb621c7cf59132e801daa41",
    "nome": "Coca Garrafa",
    "preco": 5,
    "categoria": "Bebidas",
    "IDRestaurante": "5cb5476789efb13063bf9c56",
    "foto": "https://goomer.com.br/public/foto.png",
    "promocao": {
        "_id": "5cb621c7cf59132e801daa42",
        "descricao": "Bebida em dobro",
        "preco": 5,
        "diasPromocao": [
            {
                "_id": "5cb621c7cf59132e801daa43",
                "primeiroDia": "Seg",
                "ultimoDia": "Qua",
                "horarioInicio": "10:00",
                "horarioFim": "12:00"
            }
        ]
    },
    "__v": 0
}]
```

### Erros:

- Caso nenhum produto tenha sido encontrado:
```javascript
{
    Erro: "Nenhum produto foi encontrado." 
}
```
---
### Rota:

    POST /api/produtos
Insere um novo produto no banco

### Parâmtros:

| Nome | Tipo | Obrigatório | Descricao |
| ------ | ------ | ------ | ------ |
| nome | String | Sim | Nome do produto
| preco | Number | Sim | Preço cobrado pelo produto
| foto | File | Não | Foto do produto
| IDRestaurante | OBjectID | Sim | ID do restaurante pelo qual o produto é vendido
| promocao | Object promocao | Nao | Detalhes de possível promocação do produto

### Parâmetros Object Promocao:

| Nome | Tipo | Obrigatório| Descricao |
| ------ | ------ | ------ | ------ |
| descricao | String: | Sim | Descricao da promoção
| preco | Number | Sim | Preço do produto para quando ele estiver em promoção
| diasPromocao | Object diasPromocao | Sim | Dias e horários validos da promocao

### Parâmetros Object diasPromocao:

| Nome | Tipo | Obrigatório| Descricao |
| ------ | ------ | ------ | ------ |
| primeiroDia | String: "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom" | Sim | Primeiro dia deste horario de promocao
| ultimoDia | String: "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom" | Sim | Ultimo dia deste horário de promocao
| horarioInicio | String | Sim | Horario de inicio da promocao no intervalo de dias inserido
| horarioFim | String | Sim | Horário de inicio da promocao no intervalo para os dias inseridos

### Retorno:
Retorna o produto inserido
```javascript
{
    "_id": ObjectId,
    "nome": String,
    "preco": Number,
    "categoria": String,
    "IDRestaurante": ObjectId,
    "foto": String,
    "promocao": {
        "_id": ObjectId,
        "descricao": String,
        "preco": Number,
        "diasPromocao": [
            {
                "_id": ObjectId,
                "primeiroDia": String,
                "ultimoDia": String,
                "horarioInicio": String,
                "horarioFim": String
            }
        ]
    },
    "__v": Number
}
```
### Exemplo:
```javascript
{
    "_id": "5cb621c7cf59132e801daa41",
    "nome": "Coca Garrafa",
    "preco": 5,
    "categoria": "Bebidas",
    "IDRestaurante": "5cb5476789efb13063bf9c56",
    "foto": "https://goomer.com.br/public/foto.png",
    "promocao": {
        "_id": "5cb621c7cf59132e801daa42",
        "descricao": "Bebida em dobro",
        "preco": 5,
        "diasPromocao": [
            {
                "_id": "5cb621c7cf59132e801daa43",
                "primeiroDia": "Seg",
                "ultimoDia": "Qua",
                "horarioInicio": "10:00",
                "horarioFim": "12:00"
            }
        ]
    },
    "__v": 0
}
```

### Erros:
- Caso o horário de alguma promoção seja invalido:
```javascript
{
    Erro: "Horário de funcionamento inválido" 
}
```
- Caso algum campo obrigatório esteja nulo:
```javascript
{
    Campo: "{nome do campo}"
    Erro: "O campo {nome do campo} é obrigatório" 
}
```
---
### Rota:

    PUT /api/produtos/{IDProduto}
Atualiza um determinado produto no banco.

### Parâmtros:

| Nome | Tipo | Obrigatório | Descricao |
| ------ | ------ | ------ | ------ |
| IDProduto | ObjectId | Sim | ID do produto que está sendo atualizado
| nome | String | Não | Nome do produto
| preco | Number | Não | Preço cobrado pelo produto
| foto | File | Não | Foto do produto
| IDRestaurante | OBjectID | Não | ID do restaurante pelo qual o produto é vendido
| promocao | Object promocao | Nao | Detalhes de possível promocação do produto

### Parâmetros Object Promocao:

| Nome | Tipo | Obrigatório| Descricao |
| ------ | ------ | ------ | ------ |
| descricao | String: | Sim | Descricao da promoção
| preco | Number | Sim | Preço do produto para quando ele estiver em promoção
| diasPromocao | Object diasPromocao | Sim | Dias e horários validos da promocao

### Parâmetros Object diasPromocao:

| Nome | Tipo | Obrigatório| Descricao |
| ------ | ------ | ------ | ------ |
| primeiroDia | String: "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom" | Sim | Primeiro dia deste horario de promocao
| ultimoDia | String: "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom" | Sim | Ultimo dia deste horário de promocao
| horarioInicio | String | Sim | Horario de inicio da promocao no intervalo de dias inserido
| horarioFim | String | Sim | Horário de inicio da promocao no intervalo para os dias inseridos

### Retorno:

Retorna o produto atualizado
```javascript
{
    "_id": ObjectId,
    "nome": String,
    "preco": Number,
    "categoria": String,
    "IDRestaurante": ObjectId,
    "foto": String,
    "promocao": {
        "_id": ObjectId,
        "descricao": String,
        "preco": Number,
        "diasPromocao": [
            {
                "_id": ObjectId,
                "primeiroDia": String,
                "ultimoDia": String,
                "horarioInicio": String,
                "horarioFim": String
            }
        ]
    },
    "__v": Number
}
```
### Exemplo:
```javascript
{
    "_id": "5cb621c7cf59132e801daa41",
    "nome": "A mais nova oca!",
    "preco": 5,
    "categoria": "Bebidas",
    "IDRestaurante": "5cb5476789efb13063bf9c56",
    "foto": "https://goomer.com.br/public/foto.png",
    "promocao": {
        "_id": "5cb621c7cf59132e801daa42",
        "descricao": "Bebida em dobro",
        "preco": 5,
        "diasPromocao": [
            {
                "_id": "5cb621c7cf59132e801daa43",
                "primeiroDia": "Seg",
                "ultimoDia": "Qua",
                "horarioInicio": "10:00",
                "horarioFim": "12:00"
            }
        ]
    },
    "__v": 0
}
```

### Erros:
- Caso nenhum produto seja encontrado:
```javascript
{
    Erro: "Nenhum produto foi encontrado" 
}
```
- Caso o horário de alguma promoção seja invalido:
```javascript
{
    Erro: "Horário de funcionamento inválido" 
}
```
- Caso algum campo obrigatório esteja nulo:
```javascript
{
    Campo: "{nome do campo}"
    Erro: "O campo {nome do campo} é obrigatório" 
}
```
### Rota:

    DELETE /api/produtos/{IDProduto}
Exclui um determinado produto do banco

### Parâmtros:

| Nome | Tipo | Obrigatório | Descricao |
| ------ | ------ | ------ | ------ |
| IDProduto | String | Sim | Id do produto que está sendo excluido

### Retorno:
Retorna o produto removido
```javascript
{
    "_id": ObjectId,
    "nome": String,
    "preco": Number,
    "categoria": String,
    "IDRestaurante": ObjectId,
    "foto": String,
    "promocao": {
        "_id": ObjectId,
        "descricao": String,
        "preco": Number,
        "diasPromocao": [
            {
                "_id": ObjectId,
                "primeiroDia": String,
                "ultimoDia": String,
                "horarioInicio": String,
                "horarioFim": String
            }
        ]
    },
    "__v": Number
}
```
### Exemplo:
```javascript
{
    "_id": "5cb621c7cf59132e801daa41",
    "nome": "A mais nova oca!",
    "preco": 5,
    "categoria": "Bebidas",
    "IDRestaurante": "5cb5476789efb13063bf9c56",
    "foto": "https://goomer.com.br/public/foto.png",
    "promocao": {
        "_id": "5cb621c7cf59132e801daa42",
        "descricao": "Bebida em dobro",
        "preco": 5,
        "diasPromocao": [
            {
                "_id": "5cb621c7cf59132e801daa43",
                "primeiroDia": "Seg",
                "ultimoDia": "Qua",
                "horarioInicio": "10:00",
                "horarioFim": "12:00"
            }
        ]
    },
    "__v": 0
}
```

### Erros:
- Caso o produto não tenha sido encontrado:
```javascript
{
    Erro: "Produto não encontrado" 
}
```
---
## Erros Gerais:
- Caso alguma rota inválida tenha sido inserida
```javascript
{
    Erro: "Rota não encontrada" 
}
```
- Para qualquer outro erro
```javascript
{
    Erro: {mensagem} 
}
```

