import UsersDataAccess from "../dataAccess/users.js";
import {ok, serverError} from '../helpers/httpResponse.js'

export default class UsersControllers {
    constructor() {
        this.dataAccess = new UsersDataAccess
    }

    async getUsers(){
        try {
           const users = await this.dataAccess.getUsers() //await para esperar, se não executa função antes do tempo
           
           return ok(users) //não precisa definir tudo, chama o padrão e retorno para 'ok'
        } catch (error) {
            return serverError(error)
        }
    }

    async deleteUser(userId){
        try {
           const result = await this.dataAccess.deleteUser(userId) //await para esperar, se não executa função antes do tempo
           
           return ok(result) //não precisa definir tudo, chama o padrão e retorno para 'ok'
        } catch (error) {
            return serverError(error)
        }
    }

    async updateUser(userId, userData){
        try {
           const result = await this.dataAccess.updateUser(userId, userData) //await para esperar, se não executa função antes do tempo
           
           return ok(result) //não precisa definir tudo, chama o padrão e retorno para 'ok'
        } catch (error) {
            return serverError(error)
        }
    }
}