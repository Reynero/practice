const fs = require("fs");
const path = require("path");
const fsPromise = fs.promises;
const baseDiv = path.join(__dirname, "/../data");


class ErrorFile{
    constructor(e){
        this.message = e.code==="NONAME"?"the filename is not defined":e.code==="ENOENT"?"file was not found":e.code==="EEXIST"?"theres already an existing file, file wasnt created":e.code==="EMPTY"?"directory is empty":"Error not identified";

    }
    toString(){
        return(`File Error ${this.message}`);
    }
}


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
                await fsPromise.writeFile(fileDescriptor, stringData); 
            }catch(err){
                return new ErrorFile(err);
            }finally{
                fileDescriptor !== undefined&&fileDescriptor.close();
            }
        },
       
        read: async({dir="", file, ext, local = true}) =>{
            let route = local?dir.length>0?`${baseDiv}/${dir}`:baseDiv:dir.length>0?dir:false;
            try{
                file = typeof(file) === "string"&&file.length>0?file:false;
                if(!file){
                    return new ErrorFile({code:"NONAME"});
                }
                const data = await fsPromise.readFile(`${route}/${file}.${ext}`,"utf-8");
                const jsonData = ext === "json"?JSON.parse(data):data;
                return jsonData;
            }catch(err){
                return new ErrorFile(err);
            }
        },
        update: async({dir="", file, data, ext, local = true}) =>{
            let fileDescriptor;
            let route = local?dir.length>0?`${baseDiv}/${dir}`:baseDiv:dir.length>0?dir:false;
            try{
                fileDescriptor = await fsPromise.open(`${route}/${file}.${ext}`,"r+");
                const stringData = ext === "json"?JSON.stringify(data):data;
                await fileDescriptor.truncate(stringData.toString().length);
                await fileDescriptor.writeFile(fileDescriptor, stringData);
                return true;
            }catch(err){
                return new ErrorFile(err);
            }finally{
                fileDescriptor !== undefined && fileDescriptor.close();
            }
        },
        append: async({dir="", file, data, ext, local = true}) =>{
            let fileDescriptor;
            let route = local?dir.length>0?`${baseDiv}/${dir}`:baseDiv:dir.length>0?dir:false;
            try{
                fileDescriptor = await fsPromise.open(`${route}/${file}.${ext}`,"a");
                await fileDescriptor.appendFile(fileDescriptor, ext === "json"?`${JSON.stringify(data)},\r\n`:`${data}\r\n`);
                return true;
            }catch(err){
                return new ErrorFile(err);
            }finally{
                fileDescriptor !== undefined && fileDescriptor.close();
            }
        },
        delete: async({dir="", file, ext, local = true}) =>{
            let route = local?dir.length>0?`${baseDiv}/${dir}`:baseDiv:dir.length>0?dir:false;
            try{
                await fsPromise.unlink(`${route}/${file}.${ext}`);
                return true;
            }catch(err){
                return new ErrorFile(err);
            }
        }
    
    
};


module.exports = {dataFile, ErrorFile};