import { throws } from 'assert'
import http from 'http'

const PORT_MAILER = 2020

function enviarMail(reserva){

    const options = {
        // host: `201.179.7.212`,
        host: 'localhost',
        port: PORT_MAILER,
        path: '/api/notificacion',       
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        }
    }
    const date = new Date(reserva.dateTime)

    const data = {
        //{branchId,dateTime,userId}
        destinatario: reserva.email,
        asunto: `Se le ha otorgado un turno el dia Turno dia ${date.getDate()}/${date.getMonth()}`,
        cuerpo: `
                <p>ESTIMADO Usuario/a le comentamos que usted tiene un turno el dia 
                <b>${date.toLocaleDateString("es-ES",{weekday: "long",month:"long",day:"numeric"})}</b>
                a las <b>${date.toLocaleTimeString('es-Es',{hour12: true,hour:"2-digit",minute:"2-digit"})}</b>
                </p>`
    }    
   
    try{
        sendMail(options,data)
    }catch(e){
        console.log("No se pudo mandar el mail debido a que el endpoint no se encuentra disponible, reintente mas tarde.")
    }
  

}

const sendMail = (options,body) => {
    const req = http.request(options,(res)=>{
        let data = []
        
        res.on('data',(chunk)=>data.push(chunk))

        res.on('end',()=>{
            
            if (res.statusCode!=202){
                setTimeout(sendMail,5000, options,data)
            }
        })
    })
    req.on("error",(error)=>{
        console.log("No se pudo mandar el mail porque el microservicio no esta disponible")
    })
    req.write(JSON.stringify(body))
    req.end()
}

export default enviarMail