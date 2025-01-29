
import OrdersDataAccess from '../dataAccess/orders.js'
import {ok, serverError} from '../helpers/httpResponse.js'

export default class OrdersControllers {
    constructor() {
        this.dataAccess = new OrdersDataAccess()
    }

    async getOrders(){
        try {
           const orders = await this.dataAccess.getOrders() //await para esperar, se não executa função antes do tempo
           
           return ok(orders) //não precisa definir tudo, chama o padrão e retorno para 'ok'
        } catch (error) {
            return serverError(error)
        }
    }

    async getOrdersByUserId(userId){
        try {
           const orders = await this.dataAccess.getOrdersByUserId(userId) //await para esperar, se não executa função antes do tempo
           
           return ok(orders) //não precisa definir tudo, chama o padrão e retorno para 'ok'
        } catch (error) {
            return serverError(error)
        }
    }

    async getAvailableOrders(){
        try {
           const orders = await this.dataAccess.getAvailableOrders() 
           
           return ok(orders) 
        } catch (error) {
            return serverError(error)
        }
    }

    async addOrder(orderData){
        try {
           const result = await this.dataAccess.addOrder(orderData)
           
           return ok(result) //não precisa definir tudo, chama o padrão e retorno para 'ok'
        } catch (error) {
            return serverError(error)
        }
    }

    async deleteOrder(orderId){
        try {
           const result = await this.dataAccess.deleteOrder(orderId) 
           
           return ok(result) //não precisa definir tudo, chama o padrão e retorno para 'ok'
        } catch (error) {
            return serverError(error)
        }
    }

    async updateOrder(orderId, orderData){
        try {
           const result = await this.dataAccess.updateOrder(orderId, orderData) //await para esperar, se não executa função antes do tempo
           
           return ok(result) //não precisa definir tudo, chama o padrão e retorno para 'ok'
        } catch (error) {
            return serverError(error)
        }
    }
}