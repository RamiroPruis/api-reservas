import fs from "fs"

const DISPONIBLE = 0
const RESERVADO = 1
const SOLICITANDO = 2

const updateFile = () => {
    fs.writeFileSync('./modules/Reservas.json',JSON.stringify(reservas, null, '\t'),(error)=>{
        if (error){
            throw "No se pudo sobreescribir el archivo";
}
    })
}

let reservas = fs.readFileSync("./modules/Reservas.json")
reservas = JSON.parse(reservas)


export function findWithFilters(query){
    let {branchId,dateTime,userId} = query

    dateTime =dateTime ? dateTime.replaceAll("-","/") : null

    return reservas.filter(r => (r.branchId == branchId || !branchId) && (new Date(r.dateTime).toLocaleDateString() == new Date(dateTime).toLocaleDateString() || !dateTime) && (r.userId == userId || !userId))
}

export function findById(id){
    const reserva = reservas.find((r) => r.id == id)
    if (reserva!=null)
        return reserva
    else
        throw "No existe reserva con ese id"
} 

export function create(reserva, status){
    let res = reservas.findIndex((r) => (r.id==reserva.id))
    if (res != -1){
        if (reservas[res].status != RESERVADO){
            reservas[res].userId = reserva.userId
            reservas[res].email = reserva.email
            
            //Si se esta confirmando
            if (status == SOLICITANDO){
                reservas[res].status = status
                updateFile()
                setTimeout(checkIfConfirmed, 3000, reserva.id);//1 minutos
            }else{
                if (reservas[res].status == SOLICITANDO){
                    reservas[res].status = status
                    updateFile()
                    return reservas[res]
                }
                else{
                    throw "Pasaron mas de 60 segundos y no se confirmó el turno solicitado. Turno liberado, vuelva a intentarlo."
                }
            }          
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
        reservas[res].userId = -1;
        reservas[res].email = null;
        reservas[res].status = DISPONIBLE
        updateFile()
    }else{
        throw "No se puede eliminar el turno, no hay uno asociado al Id mencionado."
    }
}

function checkIfConfirmed(id){
    const res = reservas.findIndex((r) => (r.id == id))

    if (reservas[res].status != RESERVADO){
        reservas[res].status = DISPONIBLE
        reservas[res].userId = -1
        reservas[res].email = null
        updateFile()
    }
}

