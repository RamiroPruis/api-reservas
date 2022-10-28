



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
            errorHandler(405,"Metodo no permitido",res)
        }
    }  
}