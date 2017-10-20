# charcode-server

## Configuration
1. Instale as dependências (`yarn install`/`npm install`)
2. Crie e preencha o arquivo `env/.env` com as chaves obrigatórias*
3. Inicie o servidor (`yarn start`/`npm run start`)
4. Pronto! ;)

\* a pasta env possui um arquivo chamado `.env.example` para especificar quais chaves **devem** estar no seu `.env`(que você deve criar e preencher) caso contrário a aplicação não iniciará, este comportamento se deve ao [dotenv-safe](https://github.com/rolodato/dotenv-safe/). Cada chave possui um comentário explicando o uso dela para facilitar o preenchimento.

### npm Scripts
`start` - inicia o servidor com live reload

`start:debug` - mesmo comportamento que o `start` porém com suporte a debug

`build` - transpila o código-fonte para a pasta dist/

`serve` - inicia o servidor usando os arquivos transpilados

`test` - executa todos os testes

`lint` - executa o lint no código-fonte

## Folder Structure
```
─┬── dist // Pasta alvo para os arquivos transpilados
 |
 ├── .env // Chave-valor para as variáveis de ambiente
 ├── .env.example // Chaves obrigatórias para as variáveis de ambiente
 |
 ├── src
 |    ├── api
 |    |    ├── v1
 |    |    |    ├── ... // endpoints da API para a versão que da nome a pasta
 |    |    |    └── index.js // Junta todas as rotas da versão
 |    |    ├── ...
 |    |    └── index.js // Junta todas as versões
 |    |
 |    ├── config // Possui as configurações relacionadas ao servidor (i.e. database, express middlewares)
 |    ├── middlewares // Definição dos middlwares cutomizados
 |    ├── models // Schemas do mongoose e declaração de models
 |    ├── services // Serviços
 |    └── app.js // Inicialização do servidor e configuração inicial
 └── test // Testes unitário e/ou de integração
```
