# Aplicação #

Essa é uma aplicação feita em Angular para o teste de frontend. 

### Foco em código claro ###

Criei a aplicação com foco em deixar o mais fácil possível de realizar manutenções, visto que esse é um problema que temos em grandes aplicações.

### Melhorias de usabilidade ###
Apliquei máscaras nos campos do formulário e mensagens de validações além das pedidas no layout.

### Validações e algoritmo de validação cartão ###
Apliquei validação de cartão de crédito VISA e Master Card atráves de regex e algoritmo Luhn.

Também apliquei um cenário de cartão reprovado através do mock de cartão VISA 4111 1111 1111 1111.

### Camada de request para api e mock ###
A Camada de request para api está comentada abaixo do mock de resposta do service.

### Técnicas de otimização ###
Apliquei técnicas de otimização de aplicações web, como tratamento de memory leak e lazy load. 

Poderia ser aplicado também outras técnicas como service worker, server side rendering, etc...

## Como utilizar? ##

Necessário ter uma versão do node de preferência LTS mais recente.

##### Instale as dependências #####

	npm i

#### Inicie o projeto: ####
Acesse http://localhost:4201 após rodar o comando abaixo

	npm run start

##### Para rodar os testes unitários #####
Uma versão do navegador chrome será aberta com o resultado dos testes unitários.

    npm run test

