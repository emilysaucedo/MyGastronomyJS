import express from 'express';
import OrdersControllers from '../controllers/orders.js';


const ordersRouter = express.Router() //criamos uma rota

const ordersControllers = new OrdersControllers()

ordersRouter.get('/', async(req, res) => {
    const {sucess, statusCode, body} = await ordersControllers.getOrders()

    res.status(statusCode).send({sucess, statusCode, body})
})

ordersRouter.get('/:id', async(req, res) => {
    const {sucess, statusCode, body} = await ordersControllers.getOrdersByUserId(req.params.id)

    res.status(statusCode).send({sucess, statusCode, body})
})

ordersRouter.post('/', async (req, res) => {
    const {sucess, statusCode, body} = await ordersControllers.addOrder(req.body)

    res.status(statusCode).send({sucess, statusCode, body})    
})

ordersRouter.delete('/:id', async (req, res) => {
    const {sucess, statusCode, body} = await ordersControllers.deleteOrder(req.params.id)

    res.status(statusCode).send({sucess, statusCode, body})    
})

ordersRouter.put('/:id', async (req, res)=> {
    const {sucess, statusCode, body} = await ordersControllers.updateOrder(req.params.id, req.body)

    res.status(statusCode).send({sucess, statusCode, body})        
})

export default ordersRouter;