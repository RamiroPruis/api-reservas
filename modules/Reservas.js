import fs from 'fs'


const updateFile = () => {
    fs.writeFile('./modules/Reservas.json',JSON.stringify(reservas, null, '\t'),(error)=>{
        if (error){
            throw "No se pudo sobreescribir el archivo";
}
    })
}

let reservas = fs.readFileSync("./modules/Reservas.json")
reservas = JSON.parse(reservas)


export function find(){
    return reservas
}

export function findWithFilters(query){
    let {branchId,dateTime,userId} = query

    console.log(userId)

    return reservas.filter(r => (r.branchId == branchId || !branchId) && (new Date(r.dateTime).toLocaleDateString() == dateTime || !dateTime) && (r.userId == userId || !userId))
}

export function findById(id){
    const reserva = reservas.find((r) => r.id == id)
    if (reserva!=null)
        return reserva
    else
        throw "No existe reserva con ese id"
} 

export function create(reserva){
    let res = reservas.findIndex((r) => (r.id==reserva.id))
    if (res != -1){
        if (reservas[res].userId == null){
            reservas[res].userId = reserva.userId
            reservas[res].email = reserva.email
            updateFile()
        }else{
            throw "No se puede asignar el turno, el mismo ya esta ocupado."
        }
    }
    else{
        throw "No se encontro el turno."
    }
    
        
}

export function del(id){
    let res = reservas.findIndex((r)=>r.id==id)
    if (reservas[res]!=null){
        reservas[res].userId = null;
        reservas[res].email = null;
        updateFile()
    }else{
        throw "No se puede eliminar el turno, no hay uno asociado al Id mencionado."
    }
}

