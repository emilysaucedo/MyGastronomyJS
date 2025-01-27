
import {MongoClient} from 'mongodb'
//exportar módulo de conexão
export const Mongo = {
    async connect({mongoConnectionString, mongoDbName}){ //função para conectar
        try {
            const client = new MongoClient(mongoConnectionString) //construtor

            await client.connect() //tentar fazer a conexão     
            const db = client.db(mongoDbName)

            this.client = client
            this.db = db

            return 'Connected to mongo!'

        } catch (error) {
            return {text: 'Error during mongo connection', error}
        }

    }
}