const { file, ErrorFile } = require( '../lib/files' );
const utils = require( '../lib/utils' );

const purchase = {
    options: (data, callback) => {
        callback(200);
    },
    get : async( data, callback ) => {
        const id = typeof( data.queryStringObject.id ) === 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;
        const dataExist = await file.read( { file : 'purchases', ext : 'json' } );
        const statusCode = dataExist instanceof ErrorFile ? 500 : 200;
        const response =  dataExist instanceof ErrorFile ? { message : 'Datafile error: The file USERS could not be created' } : id ? dataExist.filter( element => element.id === id ) : dataExist;
        callback( statusCode, response );
    },
    post : async( data, callback ) => {
        const id = typeof( data.payload.id ) === 'number' && data.payload.id>0 ? data.payload.id : false;
        const description = typeof( data.payload.description ) === 'string' && data.payload.description.length > 0 ? data.payload.description.trim() : false;
        const bill = typeof( data.payload.bill ) === "number" && data.payload.bill > 0 ? data.payload.bill : false;
        const obs = typeof( data.payload.obs ) === 'string' && data.payload.obs.trim().length > 0 ? data.payload.obs.trim() : false;
        
        console.log(id);
        console.log(description);
        console.log(bill);
        console.log(obs);

        if ( !id || !description || !bill || !obs )
            return callback( 400, { message : 'Missing required fields or not valid' } );

        
        const newRegister = { 
            id,
            description,
            bill,
            obs,
            dateCreated : utils.dateFormat()
        };

        const dataExist = await file.read( { file : 'purchases', ext : 'json' } );
        const newFile = dataExist instanceof ErrorFile ? await file.create( { file : 'purchases', data : [ newRegister ], ext : 'json' } ) : dataExist.filter( element => element.email === email );
        !( dataExist instanceof ErrorFile ) && dataExist.push( newRegister );

        if ( newFile instanceof ErrorFile ) 
            return callback( 500, { message : 'The file PURCHASES could not be created' } );

        if ( newFile.length > 0 ) 
            return callback( 406, { message : 'The register already exist' } );

        const result = newFile.length === 0 && await file.update( { file : 'purchases', data : dataExist, ext : 'json' } );
        
        if ( newFile.length === 0 && result instanceof ErrorFile )
            return callback( 500, { message : 'The file purchases could not be updated' } );

        callback( 200, { message : 'The register was created successfully!' } );

    },
    put : async( data, callback ) => {
        const id = typeof( data.payload.id ) === 'number' && data.payload.id.length>0 ? data.payload.id.trim() : false;
        const description = typeof( data.payload.description ) === 'string' && data.payload.description.length > 0 ? data.payload.description.trim() : false;
        const bill = typeof( data.payload.bill ) === "number" && data.payload.bill.trim().length > 0 ? data.payload.bill.trim() : false;
        const obs = typeof( data.payload.obs ) === 'string' && data.payload.obs.trim().length > 0 ? data.payload.obs.trim() : false;
        
        if ( !id )
            return callback( 400, { message : 'Missing the record id to update' } );

        if ( !description && !bill && !obs )
            return callback( 400, { message : 'Missing required fields or not valid' } );

        const dataExist = await file.read( { file : 'purchases', ext : 'json' } );
        
        if ( dataExist instanceof ErrorFile ) 
            return callback( 500, { message : 'The file PRCHASES does not exist' } );
        
        const updateRegister = dataExist.filter( element => element.id === id )[ 0 ];

        if ( id ) {
            updateRegister.id = id;
        }
        if ( description ) {
            updateRegister.description = description;
        }
        if ( bill ) {
            updateRegister.bill = bill;
        }
        if ( obs ) {
            updateRegister.obs = obs;
        }

        const dataAvailable = dataExist.filter( element => element.email !== email );
        dataAvailable.push( updateRegister );
        const dataUpdate = await file.update( { file : 'purchases', data : dataAvailable, ext : 'json' } );
        
        if ( dataUpdate instanceof ErrorFile ) 
            return callback( 500, { message : 'The file PURCHASES does not exist' } );

        callback( 200, { message : 'The register was updated successfully!' } );

    },
    delete : async( data, callback ) => {
        const id = typeof( data.payload.id ) === 'number' ? data.payload.id.trim() : false;

        if ( !id )
            return callback( 400, { message : 'Missing the record id to update' } );

        const dataExist = await file.read( { file: "purchases", ext : 'json' } );

        if ( dataExist instanceof ErrorFile ) 
            return callback( 500, { message : 'The file PURCHASES does not exist' } );
        
        const dataAvailable = dataExist.filter( element => element.id !== id );
        const dataUpdate = await file.update( { file : 'purchases', data : dataAvailable, ext : 'json' } );

        if ( dataUpdate instanceof ErrorFile ) 
            return callback( 500, { message : 'The file PURCHASES does not exist' } );

        callback( 200, { message : 'The register was deleted successfully!' } );
    }
}

module.exports = purchase;