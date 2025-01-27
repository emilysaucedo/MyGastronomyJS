import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";
import crypto from 'crypto'; //mudar senha se for preciso

const collectionName = 'users'

export default class UsersDataAccess {
    async getUsers(){//consulta no banco
        const result = await Mongo.db
        .collection(collectionName)
        .find({})
        .toArray()
        
        console.log(result)
        return result
    }

    async deleteUser(userId){
        const result = await Mongo.db
        .collection(collectionName)
        .findOneAndDelete({_id: new ObjectId(userId)})

        return result
    }

    async updateUser(userId, userData){
            if(userData.password){
                const salt = crypto.randomBytes(16)
                    crypto.pbkdf2(userData.password, salt, 310000, 16, 'sha256', async (error, hashedPassword)=>{
                        if(error){
                            throw new Error('Error during hashing password')
                        }
                        userData = {...userData, password: hashedPassword, salt} //substitui a senha antiga
                        
                        const result = await Mongo.db
                        .collection(collectionName)
                        .findOneAndUpdate(
                            {_id: new ObjectId(userId)},
                            {$set: userData}
                        )
                
                        return result
            })
        } else {
        const result = await Mongo.db
        .collection(collectionName)
        .findOneAndUpdate(
            {_id: new ObjectId(userId)},
            {$set: userData}
        )

        return result
    }
    }
}