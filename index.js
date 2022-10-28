import http from 'http';
// import reservas from "./api/handler"
import url from 'url';

const PORT = 2001
export const ERROR_CODE = 404


const server = http.createServer((req,res)=>{

    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);

    // if (!url.includes('/api/reserva')){
    //     errorHandler(400,"Endpoint no valido",res)
    // } else{
        
    //     if(url.match(/api\/reserva(\/[0-9]+)?/)){ //Como hacemos con los query params? ashe 
    //         reservas(req,res)
    //     }else{
    //         errorHandler(400,"Endpoint no valido",res)
    //     }    
    //     console.log("se ve esto?")
    // }
})

server.listen(PORT,()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})















