import { useState } from "react"

export default function PlatesService() {
    const [platesLoading, setPlatesLoading] = useState(false)
    const [refetchPlates, setRefetchPlates] = useState(true)
    const [platesList, setPlatesList] = useState([])

    const url = 'http://localhost:3000/plates'

    const getAvailablePlates = async () => {
        try {
            console.log('Iniciando busca de pratos...')
            setPlatesLoading(true)
            
            const response = await fetch(`${url}/availables`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            
            const result = await response.json()
            //console.log('Resposta da API:', result)
            
            if(result.statusCode === 200) {
                //console.log('Dados recebidos com sucesso:', result.body)
                setPlatesList(result.body)
            } else {
                console.error('Erro na resposta:', result)
            }
        } catch (error) {
            console.error('Erro na requisição:', error)
        } finally {
            setPlatesLoading(false)
            setRefetchPlates(false)
        }
    }

    return { getAvailablePlates, platesLoading, refetchPlates, platesList }
}