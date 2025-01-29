import { Mongo } from "../database/mongo.js";
import { ObjectId } from "mongodb";

const collectionName = 'orders'

export default class OrdersDataAccess {
    async getOrders(){//consulta no banco
        const result = await Mongo.db
        .collection(collectionName)
        .aggregate([ //unir as duas tableas
            {
                $lookup: { //olhar para
                    from: 'orderItems',
                    localField: '_id',
                    foreignField: 'orderId', //campo estrangeiro(da outra tabela)
                    as: 'orderItems'
                }
            },
            {
                $lookup:{
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails'
                }
            },
            {
                $project:{ //não quero trazer esses campos
                    'userDetails.password': 0,
                    'userDetails.salt': 0
                }
            },
            {
                $unwind: '$orderItems' //qual campo quero mandar os comandos
            },
            {
                $lookup:{
                    from: 'plates',
                    localField: 'orderItems.plateId',
                    foreignField: '_id',
                    as: 'orderItems.itemDetails'
                }
            },
            {
                $group:{
                    _id: '$_id',
                    userDetails: {$first: '$userDetails'},
                    orderItems: {$push: '$orderItems'}, //porque tem mais de 1, insere os itens
                    pickupStatus: {$first: '$pickupStatus'},
                    pickupTime: {$first: '$pickupTime'}
                }
            }
        ])
        .toArray()
        
        return result
    }

    async getOrdersByUserId(userId){
        const result = await Mongo.db
        .collection(collectionName)
        .aggregate([ //unir as duas tableas
            {
                $match:{
                    userId: new ObjectId(userId)
                }
            },
            {
                $lookup: { 
                    from: 'orderItems',
                    localField: '_id',
                    foreignField: 'orderId', 
                    as: 'orderItems'
                }
            },
            {
                $lookup:{
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails'
                }
            },
            {
                $project:{ //não quero trazer esses campos
                    'userDetails.password': 0,
                    'userDetails.salt': 0
                }
            },
            {
                $unwind: '$orderItems' //qual campo quero mandar os comandos
            },
            {
                $lookup:{
                    from: 'plates',
                    localField: 'orderItems.plateId',
                    foreignField: '_id',
                    as: 'orderItems.itemDetails'
                }
            },
            {
                $group:{
                    _id: '$_id',
                    userDetails: {$first: '$userDetails'},
                    orderItems: {$push: '$orderItems'}, //porque tem mais de 1, insere os itens
                    pickupStatus: {$first: '$pickupStatus'},
                    pickupTime: {$first: '$pickupTime'}
                }
            }
        ])
        .toArray()
        
        return result
    }

    async addOrder(orderData){
        const { items, ...orderDataRest} = orderData

        orderDataRest.createdAt = new Date()
        orderDataRest.pickupStatus = 'Pending'
        orderDataRest.userId = new ObjectId(orderDataRest.userId)
        
        const newOrder = await Mongo.db
        .collection(collectionName)
        .insertOne(orderDataRest)

        if(!newOrder.insertedId){
            throw new Error('Order cannot be inserted')
        }

        //prato, quantidade 
        items.map((item)=>{ //para cada item da lista faça
            item.plateId = new ObjectId(item.plateId)
            item.orderId = new ObjectId(newOrder.insertedId) //novo id do pedido deve ser criado
        })

        const result = await Mongo.db
        .collection('orderItems')
        .insertMany(items)

        return result
    }
    //temos o pedido e os itens do pedido, duas operações - Primeiro elimina os itens e depois o pedido
    async deleteOrder(orderId){
        const itemsToDelete = await Mongo.db
        .collection('orderItems')
        .deleteMany({orderId: new ObjectId(orderId)})

        
        const orderToDelete = await Mongo.db
        .collection(collectionName)
        .findOneAndDelete({_id: new ObjectId(orderId)})

        const result = {
            itemstoDelete,
            orderToDelete
        }
        return result
    }

    async updateOrder(orderId, orderData){
        const result = await Mongo.db
        .collection(collectionName)
        .findOneAndUpdate(
            {_id: new ObjectId(orderId)},
            {$set: orderData}
        )

        return result
    }
}