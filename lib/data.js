const fs = require("fs");//file system
const path = require("path");
const fsPromise = fs.promises;
//here we are having the base file direction 
const baseDiv = path.join(__dirname, "/../data");
const dataFile = {
    create: async({dir="", file, data, ext, local = true}) =>{
        let fileDescriptor;
        let route = local?dir.length>0?`${baseDiv}/${dir}`:baseDiv:dir.length>0?dir:false;
        if(!route){
            return false;
            }
            try{
                fileDescriptor = await fsPromise.open(`${route}/${file}.${ext}`,"wx");
                const stringData = ext === "json"?JSON.stringify(data):data;
                //we use await for the program to wait until thi specific line ends doing its task
                await fsPromise.writeFile(fileDescriptor, stringData); 
            }catch(err){
                return JSON.stringify(err);
            }finally{
                //&& is like having one single if, in case of using ? you are forced to use : as else
                fileDescriptor !== undefined&&fileDescriptor.close();
            }
        },
       
        read: async({dir="", file, data, ext, local = true}) =>{
            let route = local?dir.length>0?`${baseDiv}/${dir}`:baseDiv:dir.length>0?dir:false;
            try{
                file = typeof(file) === "string"&&file.length>0?file:false;
                if(!file){
                    return({error: "the name of the file doesnt exist"});
                }
                const data = await fsPromise.readFile(`${route}/${file}.${ext}`,"utf-8");
                /*when a json file is stored in a variable it is saved as a string, in order for us to 
                have it back in json format we have to use parse*/
                const jsonData = ext === "json"?JSON.parse(data):data;
                return jsonData;
            }catch(err){
                return JSON.stringify(err);
            }
        }
    
    
};