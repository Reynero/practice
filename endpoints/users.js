const file = require("../lib/data");
const user = {
    options: (data, callback) => {
        callback(200);
    },
    get: async (data, callback) => {
        const id = typeof(data.id) === "number"&&data.id>0?data.id:false;
        try{
            const dataFile = await file.dataFile.read({file:"users",ext:"json"});
            const response = id?dataFile.filter(e => e.id === id):dataFile;
            callback(200, response);
        }catch(e){
            callback(500, e);
        }

    }
}