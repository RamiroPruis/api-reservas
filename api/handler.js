
import errorHandler from "../error.js"
import {ERROR_CODE} from "../index.js"
import * as Reservas from "../modules/Reservas.js"
import url from "url"

const ID_METHOD_HANDLER = {
    GET: getById,
    POST: postById,
    DELETE: delById
}

const METHOD_HANDLER = {
    GET: getAll
}

export const reservas = (req, res) => {
    const {method} = req
    const id = req.url.split('/').pop()

    const queryObject = url.parse(req.url,true).query || null

    if (id.match(/[0-9]+/) && !Object.keys(queryObject).length){
        
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
    try{
        const reserva = Reservas.findById(id)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({reserva}))
    }
    catch(e){
        errorHandler(ERROR_CODE,e,res)
    }
}

function postById(req, res, id){
    let body = []
    req.on('data',(chunk)=>{
        body += chunk
    })

    req.on('end',()=>{
        const reserva = JSON.parse(body)
        reserva.id = id
        try{
            
            Reservas.create(reserva)
            res.writeHead(200,{'Content-Type': 'application/json'})
            res.end(JSON.stringify({}))//TODO: Esta bien que esto este vacio? asi quedamos con los otros chabones
        }
        catch(e){
            errorHandler(ERROR_CODE,e,res)
        }
    })


}

function delById(req, res, id){
    try{
    
        Reservas.del(id)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({}))
    }
    catch(e){
        errorHandler(ERROR_CODE,e,res)
    }
}

function getAll(req,res){
    const queryObject = url.parse(req.url,true).query

    const reservas = Reservas.findWithFilters(queryObject)


    res.writeHead(200,{'Content-Type': 'application/json'})
    res.end(JSON.stringify(reservas))
}
