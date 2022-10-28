
import errorHandler from "../error"
import ERROR_CODE from "../index"
import Reservas from "/modules/Reservas.js"

const METHOD_HANDLER = {
    GET: get
}

const ID_METHOD_HANDLER = {
    GET: getById,
    POST: postById,
    DELETE: delById
}

export default reservas = (req, res) => {

    const {url, method} = req
    const id = url.split('/').pop()

    if (id.match(/[0-9]+/)){
        ID_METHOD_HANDLER[method](req,res,id)
    }
    else{
        try{
            METHOD_HANDLER[method](req,res)
        }
        catch{
            errorHandler(ERROR_CODE,"Metodo no permitido",res)
        }
    }  
}

function getById(req, res, id){
    
    const reserva = Reservas.find(id)
    if (reserva != null){
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({reserva}))
    }
    else{
        errorHandler(ERROR_CODE,"Error en la busqueda de la reserva",res)
    }
}

function postById(req, res, id){
    let body = []
    req.on('data',(chunk)=>{
        body += chunk
    })

    req.on('end',()=>{
        const reserva = JSON.parse(body)
        const id = Sucursales.create(sucursal)
        
        res.writeHead(201,{'Content-Type': 'application/json'})
        res.end(JSON.stringify({id}))
    })


}

function deleteById(req, res, id){

}