import express from 'express';
import UsersControllers from '../controllers/users.js';
import exp from 'constants';

const usersRouter = express.Router() //criamos uma rota

const usersControllers = new UsersControllers(); //instanciamos o controller

usersRouter.get('/', async(req, res) => {
    const {sucess, statusCode, body} = await usersControllers.getUsers()

    res.status(statusCode).send({sucess, statusCode, body})
})

usersRouter.delete('/:id', async (req, res) => {
    const {sucess, statusCode, body} = await usersControllers.deleteUser(req.params.id)

    res.status(statusCode).send({sucess, statusCode, body})    
})

usersRouter.put('/:id', async (req, res)=> {
    const {sucess, statusCode, body} = await usersControllers.updateUser(req.params.id, req.body)

    res.status(statusCode).send({sucess, statusCode, body})        
})

export default usersRouter;