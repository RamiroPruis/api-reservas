import http from 'http'
import {reservas} from "./api/handler.js"
import errorHandler from './error.js'
import url from 'url'


const PORT = 2001
const BASE_URL = 'http://localhost'

export const ERROR_CODE = 404


const server = http.createServer((req,res)=>{
    const {url} = req

    const urlParsed = url.parse(`${BASE_URL}:${PORT}${req.url}`)

    if (!urlParsed.pathname.includes('/api/reservas')){
        errorHandler(400,"Endpoint no valido",res)
    } else{
        if(urlParsed.pathname.includes('/api/reservas')){ //Como hacemos con los query params? ashe 
            reservas(req,res)
        }else{
            errorHandler(400,"Endpoint no valido",res)
        }  
    }
})

server.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})