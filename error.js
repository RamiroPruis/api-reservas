export default function errorHandler(code,msg,res){
    res.writeHead(code)
    const obj = {
        response: msg
    }
    res.end(JSON.stringify(obj))
}