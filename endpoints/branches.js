const { file, ErrorFile } = require( '../lib/files' );
const utils = require( '../lib/utils' );

const branch = {
    options : async( data, callback ) => {
        callback( 200 );
    },
    get : async( data, callback ) => {
        const id = typeof( data.queryStringObject.id ) === 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;
        const dataExist = await file.read( { file : 'branches', ext : 'json' } );
        const statusCode = dataExist instanceof ErrorFile ? 500 : 200;
        const response =  dataExist instanceof ErrorFile ? { message : 'Datafile error: The file BRANCHES could not be created' } : id ? dataExist.filter( element => element.id === id ) : dataExist;
        callback( statusCode, response );
    },
    post : async( data, callback ) => {
        
        const id = typeof( data.payload.id ) === 'number' ? data.payload.id : false;
        const address = typeof( data.payload.address ) === 'string' && data.payload.address.length > 0 ? data.payload.address : false;
        const peoCapacity = typeof( data.payload.peoCapacity ) === 'number' ? data.payload.peoCapacity : false;
        const yearsFunc = typeof( data.payload.yearsFunc ) === 'number' && data.payload.yearsFunc ? data.payload.yearsFunc : false;

        console.log(id);
        console.log(address);
        console.log(peoCapacity);
        console.log(yearsFunc);
        if ( !id || !address || !peoCapacity || !yearsFunc )
            return callback( 400, { message : 'Missing required fields or not valid' } );

        
        const newRegister = { 
            id,
            address,
            peoCapacity,
            yearsFunc,
            dateCreated : utils.dateFormat()
        };

        const dataExist = await file.read( { file : 'branches', ext : 'json' } );
        const newFile = dataExist instanceof ErrorFile ? await file.create( { file : 'branches', data : [ newRegister ], ext : 'json' } ) : dataExist.filter( element => element.id === id );
        !( dataExist instanceof ErrorFile ) && dataExist.push( newRegister );

        if ( newFile instanceof ErrorFile ) 
            return callback( 500, { message : 'The file BRANCHES could not be created' } );

        if ( newFile.length > 0 ) 
            return callback( 406, { message : 'The register already exist' } );

        const result = newFile.length === 0 && await file.update( { file : 'branches', data : dataExist, ext : 'json' } );
        
        if ( newFile.length === 0 && result instanceof ErrorFile )
            return callback( 500, { message : 'The file USERS could not be updated' } );

        callback( 200, { message : 'The register was created successfully!' } );

    },
    put : async( data, callback ) => {
        const id = typeof( data.payload.firstName ) === 'number' ? data.payload.id : false;
        const address = typeof( data.payload.address ) === 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;
        const peoCapacity = typeof( data.payload.peoCapacity ) === 'number' && data.payload.peoCapacity.trim().length > 0 ? data.payload.peoCapacity.trim() : false;
        const yearsFunc = typeof( data.payload.yearsFunc ) === 'number' && data.payload.yearsFunc ? data.payload.yearsFunc : false;

        if ( !id )
            return callback( 400, { message : 'Missing the record id to update' } );

        if ( !address && !peoCapacity && !yearsFunc )
            return callback( 400, { message : 'Missing required fields or not valid' } );

        const dataExist = await file.read( { file : 'branches', ext : 'json' } );
        
        if ( dataExist instanceof ErrorFile ) 
            return callback( 500, { message : 'The file BRANCHES does not exist' } );
        
        const updateRegister = dataExist.filter( element => element.id === id )[ 0 ];

        if ( id) {
            updateRegister.id = id;
        }
        if ( address ) {
            updateRegister.address = address;
        }
        if ( peoCapacity ) {
            updateRegister.peoCapacity = peoCapacity;
        }
        if ( yearsFunc ) {
            updateRegister.yearsFunc = yearsFunc;
        }

        const dataAvailable = dataExist.filter( element => element.id !== id );
        dataAvailable.push( updateRegister );
        const dataUpdate = await file.update( { file : 'branches', data : dataAvailable, ext : 'json' } );
        
        if ( dataUpdate instanceof ErrorFile ) 
            return callback( 500, { message : 'The file BRANCHES does not exist' } );

        callback( 200, { message : 'The register was updated successfully!' } );

    },
    delete : async( data, callback ) => {
        const id = typeof( data.payload.email ) === 'number' ? data.payload.id : false;

        if ( !id )
            return callback( 400, { message : 'Missing the record id to update' } );

        const dataExist = await file.read( { file: "branches", ext : 'json' } );

        if ( dataExist instanceof ErrorFile ) 
            return callback( 500, { message : 'The file BRANCHES does not exist' } );
        
        const dataAvailable = dataExist.filter( element => element.email !== email );
        const dataUpdate = await file.update( { file : 'branches', data : dataAvailable, ext : 'json' } );

        if ( dataUpdate instanceof ErrorFile ) 
            return callback( 500, { message : 'The file BRANCHES does not exist' } );

        callback( 200, { message : 'The register was deleted successfully!' } );
    },
};

module.exports = branch;