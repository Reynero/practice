const file = require("../lib/data");
const user = {
    options: (data, callback) => {
        callback(200);
    },
    get: async (data, callback) => {
        //trim is to ignore some garbage that the url might have
        const id = typeof(data.queryStringObj.id) === "number"&&data.queryStringObj.id>0?data.id:false;
        const dataFile = await file.dataFile.read({file:"users",ext:"json"});
        const response = id?dataFile.filter(e => e.id === id):dataFile;
        callback(200, response);
        

    },
    post: async (data, callback) => {
        const email = typeof(data.payload.email) === "string"&&utils.validateEmail(data.payload.email)?data.payload.email.trim():false;
        const nombre = typeof(data.payload.email) === "string"&&data.payload.nombre.length>0?data.payload.nombre:false;
        if(!nombre||!apellido||!email||!password||!conf){
            callback(400,{message:"valor no valido"});
        }
        if(password !== conf){
            callback(400, {message:"la contra no coincide"});
        }
        const newRegister = {
            username: email,
            email,
            nombre,
            apellido,
            password: utils.hash(password)
        }
        const dataExist = await file.read({file:"users",ext:"json"});
        const newFile = dataExist instanceof ErrorFile?await file.create({file:"users",data:[newRegister],ext:"json"}):dataExist.filter(e => e.username === email);
        
    }
}

module.exports = user;