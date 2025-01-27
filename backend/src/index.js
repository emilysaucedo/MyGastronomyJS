import express from 'express' //criar servidor web
import cors  from 'cors'
import { Mongo } from './database/mongo.js' 
import { config } from 'dotenv'
import authRouter from './auth/auth.js'
import usersRouter from './routes/users.js'

config() //carrega os arquivos .env (Senhas)

//função principal do nosso aplicativo
async function main () {
    const hostname = 'localhost'
    const port = 3000

    //express define a aplicação
    const app = express()

    //conexão
    const mongoConnection = await Mongo.connect({mongoConnectionString: process.env.MONGO_CS, mongoDbName: process.env.MONGO_DB_NAME}) //pega do arquivo das senhas
    console.log(mongoConnection)

    app.use(express.json())
    app.use(cors())

    //formato da requisição //mensagem que vamos enviar ao acessar o endereço //rota de requisição
    app.get('/', (req, res) => {  //request e response
        res.send({ //enviando a mensagem
            sucess: true,
            statusCode: 200, //sucesso
            body: 'Welcome to MyGastronomy' 
        })
    })

    //routes
    app.use('/auth', authRouter) //rota de autenticação
    app.use('/users', usersRouter) //rota de usuários

    //inicialização do servidor
    app.listen(port, ()=> {
        console.log(`Server running on: http://${hostname}:${port}`) 
    })
}

main();