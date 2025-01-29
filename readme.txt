#Usar o Node.js
#Usar o MongoDB

#Projeto de um restaurante, com compras de itens, login e autenticação.
#O sistema deve ter um sistema de login e autenticação, com o usuário poder criar uma conta.
#O sistema deve ter um sistema de compras, onde o usuário possa comprar itens.


##Video 01
#Para inciar, sempre: npm i -D nodemon
    -D -> desenvolvimento, não vai rodar em produção

#npm i express cors mongodb passport passport-local crypto jsonwebtoken
#Relacionado ao banco, autenticação...

#src -> pasta onde estará o projeto
#package.json > scripts -> como vamos rodar

#A primeira coisa no index.js dentro do src foi definir a aplicação rodando; a porta e servidor; Realizando a inicialização do projeto;

#Vamos fazer as requisições no Thunder

##Video 02 - Conectando com banco de dados
#Criar arquivo para mongo
#npm i dotenv -> criar váriaveis do ambiente -> para não deixar senhas espalhadas pelo código
#Cria um arquivo .env
#Cria a connectionString no Mongo

##Video 03 - Autenticação do Usuário 
#Registro e Autenticação
#Criamos uma pasta de auth e um arquivo auth.js para as regras de criptografia 
#Vamos criar o user
#Criamos o token
#Fazer uma request de POST

##Video 05 - CRUD
#Requisição dos dados, atualização e eliminação 
#dataAccess: acesso aos dados, comunicação entre o Mongo e o Node
#controllers: controladores dos resultados, se deu certo ou errado
#routes: rotas, por exemplo, /user, /auth
#helpers: ajudantes; módulos para nos ajudar 

##Vídeo 07 - Interagindo com bancos de dados
#Adicionar os pratos