
import errorHandler from "../error"
import ERROR_CODE from "../index"
import * as Reservas from "../modules/Reservas"
import url from "url"


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
    console.log("Entramos al get con el id", id)
    try{
        const reserva = Reservas.find(id)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({reserva}))
    }
    catch{
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
        try{
            Reservas.create(reserva)
            res.writeHead(200,{'Content-Type': 'application/json'})
            res.end(JSON.stringify({}))//TODO: Esta bien que esto este vacio? asi quedamos con los otros chabones
        }
        catch{
            errorHandler(ERROR_CODE,"Error al crear una reserva",res)
        }
    })


}

function deleteById(req, res, id){

}