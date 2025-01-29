import PlatesDataAccess from '../dataAccess/plates.js'
import {ok, serverError} from '../helpers/httpResponse.js'

export default class PlatesControllers {
    constructor() {
        this.dataAccess = new PlatesDataAccess
    }

    async getPlates(){
        try {
           const plates = await this.dataAccess.getPlates() //await para esperar, se não executa função antes do tempo
           
           return ok(plates) //não precisa definir tudo, chama o padrão e retorno para 'ok'
        } catch (error) {
            return serverError(error)
        }
    }

    async getAvailablePlates(){
        try {
           const plates = await this.dataAccess.getAvailablePlates() 
           
           return ok(plates) 
        } catch (error) {
            return serverError(error)
        }
    }

    async addPlate(plateData){
        try {
           const result = await this.dataAccess.addPlate(plateData)
           
           return ok(result) //não precisa definir tudo, chama o padrão e retorno para 'ok'
        } catch (error) {
            return serverError(error)
        }
    }

    async deletePlate(plateId){
        try {
           const result = await this.dataAccess.deletePlate(plateId) 
           
           return ok(result) //não precisa definir tudo, chama o padrão e retorno para 'ok'
        } catch (error) {
            return serverError(error)
        }
    }

    async updatePlate(plateId, plateData){
        try {
           const result = await this.dataAccess.updatePlate(plateId, plateData) //await para esperar, se não executa função antes do tempo
           
           return ok(result) //não precisa definir tudo, chama o padrão e retorno para 'ok'
        } catch (error) {
            return serverError(error)
        }
    }
}