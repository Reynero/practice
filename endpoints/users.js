const file = require("../lib/data.js");
const utils = require("../lib/utils"); 
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
        const email = typeof(data.payload.email) === "string"&&utils.validateEmail(data.payload.email.trim())?data.payload.email.trim():false;
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
        
    },
    put : async( data, callback ) => {
        const email = typeof( data.payload.email ) === 'string' && utils.validateEmail( data.payload.email.trim() ) === true ? data.payload.email.trim() : false;
        const firstName = typeof( data.payload.firstName ) === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
        const lastName = typeof( data.payload.lastName ) === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
        const password = typeof( data.payload.password ) === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
        const confirm = typeof( data.payload.confirm ) === 'string' && data.payload.confirm.trim().length > 0 ? data.payload.confirm.trim() : false;

        if ( !email )
            return callback( 400, { message : 'Missing the record id to update' } );

        if ( !firstName && !lastName && !password && !confirm )
            return callback( 400, { message : 'Missing required fields or not valid' } );

        if ( password !== confirm )
            return callback( 400, { message : 'Password confirmation does not match password' } );

        const dataExist = await file.read( { file : 'users', ext : 'json' } );
        
        if ( dataExist instanceof ErrorFile ) 
            return callback( 500, { message : 'The file USERS does not exist' } );
        
        const updateRegister = dataExist.filter( element => element.email === email )[ 0 ];

        if ( firstName) {
            updateRegister.firstName = firstName;
        }
        if ( lastName ) {
            updateRegister.lastName = lastName;
        }
        if ( email ) {
            updateRegister.email = email;
        }
        if ( password ) {
            updateRegister.hashedPassword = utils.hash( password );
        }

        const dataAvailable = dataExist.filter( element => element.email !== email );
        dataAvailable.push( updateRegister );
        const dataUpdate = await file.update( { file : 'users', data : dataAvailable, ext : 'json' } );
        
        if ( dataUpdate instanceof ErrorFile ) 
            return callback( 500, { message : 'The file USERS does not exist' } );

        callback( 200, { message : 'The register was updated successfully!' } );

    },
    delete : async( data, callback ) => {
        const email = typeof( data.payload.email ) === 'string' && utils.validateEmail( data.payload.email.trim() ) === true ? data.payload.email.trim() : false;

        if ( !email )
            return callback( 400, { message : 'Missing the record id to update' } );

        const dataExist = await file.read( { dir : this.tableName, file : this.tableName, ext : 'json' } );

        if ( dataExist instanceof ErrorFile ) 
            return callback( 500, { message : 'The file USERS does not exist' } );
        
        const dataAvailable = dataExist.filter( element => element.email !== email );
        const dataUpdate = await file.update( { file : 'users', data : dataAvailable, ext : 'json' } );

        if ( dataUpdate instanceof ErrorFile ) 
            return callback( 500, { message : 'The file USERS does not exist' } );

        callback( 200, { message : 'The register was deleted successfully!' } );
    }
}

module.exports = user;