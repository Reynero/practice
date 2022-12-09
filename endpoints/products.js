const { file, ErrorFile } = require( '../lib/files' );
const utils = require( '../lib/utils' );

const product = {
    options: (data, callback) => {
        callback(200);
    },
    get: async (data, callback) => {
        //trim is to ignore some garbage that the url might have
        const id = typeof( data.queryStringObject.id ) === 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;
        const dataExist = await file.read( { file : 'products', ext : 'json' } );
        const statusCode = dataExist instanceof ErrorFile ? 500 : 200;
        const response =  dataExist instanceof ErrorFile ? { message : 'Datafile error: The file PRODUCTS could not be created' } : id ? dataExist.filter( element => element.id === id ) : dataExist;
        callback( statusCode, response );
        

    },
    post: async (data, callback) => {
        const id = typeof( data.payload.id ) === 'number' === true ? data.payload.id : false;
        const name = typeof( data.payload.name ) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
        const description = typeof( data.payload.description ) === 'string' && data.payload.description.trim().length > 0 ? data.payload.description.trim() : false;
        const onStock = typeof( data.payload.onStock ) === "boolean"? data.payload.onStock : false;
        const amount = typeof( data.payload.amount ) === "number"?data.payload.amount : false;
        

        
        if(!id||!name||!description||!onStock||!amount){
            return callback(400,{message:"valor no valido aa"});
        }
        
        const newRegister = {
            id,
            name,
            description,
            onStock,
            amount,
            dateCreated : utils.dateFormat()
        }
        const dataExist = await file.read({file:"products",ext:"json"});
        const newFile = dataExist instanceof ErrorFile?await file.create({file:"products",data:[newRegister],ext:"json"}):dataExist.filter(e => e.id === id);
        !( dataExist instanceof ErrorFile ) && dataExist.push( newRegister );

        if ( newFile instanceof ErrorFile ) 
            return callback( 500, { message : 'The file PRODUCTS could not be created' } );

        if ( newFile.length > 0 ) 
            return callback( 406, { message : 'The register already exist' } );

        const result = newFile.length === 0 && await file.update( { file : 'products', data : dataExist, ext : 'json' } );
        
        if ( newFile.length === 0 && result instanceof ErrorFile )
            return callback( 500, { message : 'The file USERS could not be updated' } );

        callback( 200, { message : 'The register was created successfully!' } );
    },
    put : async( data, callback ) => {
        const id = typeof( data.payload.id ) === 'number' === true ? data.payload.id : false;
        const name = typeof( data.payload.name ) === 'string' && data.payload.name.trim().length > 0 ? data.payload.name.trim() : false;
        const description = typeof( data.payload.description ) === 'string' && data.payload.description.trim().length > 0 ? data.payload.description.trim() : false;
        const onStock = typeof( data.payload.onStock ) === "boolean"? data.payload.onStock : false;
        const amount = typeof( data.payload.amount ) === "number"?data.payload.amount : false;

        if ( !id )
            return callback( 400, { message : 'Missing the record id to update' } );

        if ( !name && !description && !onStock && !amount )
            return callback( 400, { message : 'Missing required fields or not valid' } );

        const dataExist = await file.read( { file : 'products', ext : 'json' } );
        
        if ( dataExist instanceof ErrorFile ) 
            return callback( 500, { message : 'The file USERS does not exist' } );
        
        const updateRegister = dataExist.filter( element => element.id === id )[ 0 ];

        if ( name) {
            updateRegister.firstName = firstName;
        }
        if ( description ) {
            updateRegister.lastName = lastName;
        }
        if ( onStock ) {
            updateRegister.email = email;
        }
        if ( amount ) {
            updateRegister.hashedPassword = utils.hash( password );
        }

        const dataAvailable = dataExist.filter( element => element.id !== id );
        dataAvailable.push( updateRegister );
        const dataUpdate = await file.update( { file : 'products', data : dataAvailable, ext : 'json' } );
        
        if ( dataUpdate instanceof ErrorFile ) 
            return callback( 500, { message : 'The file PRODUCTS does not exist' } );

        callback( 200, { message : 'The register was updated successfully!' } );

    },
    delete : async( data, callback ) => {
        const id = typeof( data.payload.id ) === 'number' ? data.payload.id : false;

        if ( !id )
            return callback( 400, { message : 'Missing the record id to update' } );

        const dataExist = await file.read( { file : "products", ext : 'json' } );

        if ( dataExist instanceof ErrorFile ) 
            return callback( 500, { message : 'The file USERS does not exist' } );
        
        const dataAvailable = dataExist.filter( element => element.email !== email );
        const dataUpdate = await file.update( { file : 'products', data : dataAvailable, ext : 'json' } );

        if ( dataUpdate instanceof ErrorFile ) 
            return callback( 500, { message : 'The file PRODUCTS does not exist' } );

        callback( 200, { message : 'The register was deleted successfully!' } );
    }
}

module.exports = product;