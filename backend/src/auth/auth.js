import express from 'express' //criar rotas
import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from 'crypto' //criptografia
import { Mongo } from '../database/mongo.js'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb' //como o mongo coloca o id
import { text } from 'stream/consumers'
import { callbackify } from 'util'

const collectionName = 'users'

passport.use(new LocalStrategy({ usernameField: 'email'}, async (email, password, callback) => {
    const user = await Mongo.db
    .collection(collectionName)
    .findOne({ email: email }) //procurar para ver se não existe o usuário com esse e-mail

    if(!user){ //se não tiver o usuário 
        return callback(null, false)
    }

    const saltBuffer = user.salt.saltBuffer
    //método para criptografia
    crypto.pbkdf2(password, saltBuffer, 310000, 16, 'sha256', (err, hashedPassword) => { //números padrão para fazer a criptografia 
        if(err) {
            return callback(err, false)
        }

        const userPasswordBuffer = Buffer.from(user.password.buffer) //como o mongodb salva

        //decriptação
        if(!crypto.timingSafeEqual(userPasswordBuffer, hashedPassword)){ //compara a senha da pessoa com a senha
            return callback(null, false)
        }

        const { password, salt, ...rest} = user //o ...rest indica que do objeto user, separamos a password

        return callback(null, rest)
    })
}))

//criando a rota
const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
    const checkUser = await Mongo.db
    .collection(collectionName)
    .findOne({email: req.body.email})
    //valida se existe o e-mail
    if(checkUser){
        return res.status(500).send({
            success: false, 
            statusCode: 500, 
            body: {
                text: 'User already exists!'
            }
        })
    }
    //criptografia do usuário, da senha
    const salt = crypto.randomBytes(16)
    crypto.pbkdf2(req.body.password, salt, 310000, 16, 'sha256', async (err, hashedPassword)=>{
        if(err){
            return res.status(500).send({
                success: false, 
                statusCode: 500, 
                body: {
                    text: 'Error on crypto password',
                    err: err
                }
        })
        }
        //inserindo user no banco de dados
        const result = await Mongo.db 
        .collection(collectionName)
        .insertOne({
            email: req.body.email,
            password: hashedPassword,
            salt //chave de criptografia
        })

        if(result.insertedId){
            const user = await Mongo.db
            .collection(collectionName)
            .findOne({_id: new ObjectId(result.insertedId)})
            //criamos o token
            const token = jwt.sign(user, 'secret')

            return res.send({
                success: true, 
                statusCode: 200, 
                body: {
                    text: 'User registered correctly!',
                    token,
                    user, 
                    logged: true
                }
            })
        }
        
    })
})

export default authRouter