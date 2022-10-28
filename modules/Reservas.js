import fs from 'fs'

const updateFile = () => {
    fs.writeFile('./Reservas.json',JSON.stringify(reservas))
}

const reservas = fs.readFile("./Reservas.json",(err,data)=>{
    if (err)
        throw err
    return data
})


export function find(){
    return reservas
}

export function find(id){

    const reserva = reservas.find((r) => r.id = reservas.id)
    if (reserva!=null)
        return reserva
    else
        throw "No existe reserva con ese id"
} 

export function create(reserva){
    let res = reservas.findIndex((r) => (r.id==reserva.id))
    if (arr[res].userId == null){
        reservas[res].userId = reserva.userId
        reservas[res].email = reserva.email
        updateFile()
    }else{
        throw "No se puede asignar el turno, el mismo ya esta ocupado."
    }
        
}

export function del(id){
    let res = reservas.findIndex((r)=>r.id==id)
    if (arr[res]!=null){
        arr[res].userId = null;
        arr[res].email = null;
        updateFile()
    }else{
        throw "No se puede eliminar el turno, no hay uno asociado al Id mencionado."
    }
}