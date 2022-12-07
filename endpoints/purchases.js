const file = require("../lib/data");
const purchase = {
    options: (data, callback) => {
        callback(200);
    },
    get: async (data, callback) => {
        //trim is to ignore some garbage that the url might have
        const id = typeof(data.queryStringObj.id) === "number"&&data.queryStringObj.id>0?data.id:false;
        const dataFile = await file.dataFile.read({file:"purchases",ext:"json"});
        const response = id?dataFile.filter(e => e.id === id):dataFile;
        callback(200, response);
        

    },
    post: async (data, callback) => {
        const id = typeof(data.payload.id) === "number"&&data.payload.id>0?data.payload.id:false;
        const nombre = typeof(data.payload.nombre) === "string"&&data.payload.nombre.length>0?data.payload.nombre:false;
        const costo = typeof(data.payload.costo) === "number"&&data.payload.costo>0?data.payload.costo:false;
        
        if(!id||!nombre||!costo){
            callback(400,{message:"valor no valido"});
        }
        const newRegister = {
            id: nombre,
            nombre,
            costo
        }
        const dataExist = await file.read({file:"purchases",ext:"json"});
        const newFile = dataExist instanceof ErrorFile?await file.create({file:"purchases",data:[newRegister],ext:"json"}):dataExist.filter(e => e.id === nombre);
        
    }
}

module.exports = purchase;