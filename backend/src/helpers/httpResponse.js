/* Responsável por formatar as respostas:
*/

export const ok = (body) => {
    return {
        success: true,
        statusCode: 200, 
        body: body
    }
}

export const notFound = () => {
    return {
        success: false,
        statusCode: 400, 
        body: 'Not found'
    }    
}

export const serverError = (error) => { //arrow function, para ter parâmetros se preciso
    return {
        success: false,
        statusCode: 400, 
        body: error
    }    
}