const { file, ErrorFile } = require( '../lib/files' );
const utils = require( '../lib/utils' );

const staff = {
    options : async( data, callback ) => {
        callback( 200 );
    },
    get : async( data, callback ) => {
        const id = typeof( data.queryStringObject.id ) === 'string' && data.queryStringObject.id.trim().length > 0 ? data.queryStringObject.id.trim() : false;
        const dataExist = await file.read( { file : 'staff', ext : 'json' } );
        const statusCode = dataExist instanceof ErrorFile ? 500 : 200;
        const response =  dataExist instanceof ErrorFile ? { message : 'Datafile error: The file STAFF could not be created' } : id ? dataExist.filter( element => element.id === id ) : dataExist;
        callback( statusCode, response );
    },
    post : async( data, callback ) => {
        
        const ci = typeof( data.payload.ci ) === 'number' ? data.payload.ci : false;
        const fullName = typeof( data.payload.fullName ) === 'string' && data.payload.fullName.trim().length > 0 ? data.payload.fullName.trim() : false;
        const role = typeof( data.payload.role ) === 'string' && data.payload.role.trim().length > 0 ? data.payload.role.trim() : false;
        const gender = typeof( data.payload.gender ) === 'string' && data.payload.gender.trim().length > 0 ? data.payload.gender.trim() : false;

        if ( !ci || !fullName || !role || !gender )
            return callback( 400, { message : 'Missing required fields or not valid' } );

        
        const newRegister = { 
            ci,
            fullName,
            role,
            gender,
            dateCreated : utils.dateFormat()
        };

        const dataExist = await file.read( { file : 'staff', ext : 'json' } );
        const newFile = dataExist instanceof ErrorFile ? await file.create( { file : 'staff', data : [ newRegister ], ext : 'json' } ) : dataExist.filter( element => element.id === id );
        !( dataExist instanceof ErrorFile ) && dataExist.push( newRegister );

        if ( newFile instanceof ErrorFile ) 
            return callback( 500, { message : 'The file STAFF could not be created' } );

        if ( newFile.length > 0 ) 
            return callback( 406, { message : 'The register already exist' } );

        const result = newFile.length === 0 && await file.update( { file : 'staff', data : dataExist, ext : 'json' } );
        
        if ( newFile.length === 0 && result instanceof ErrorFile )
            return callback( 500, { message : 'The file STAFF could not be updated' } );

        callback( 200, { message : 'The register was created successfully!' } );

    },
    put : async( data, callback ) => {
        const ci = typeof( data.payload.ci ) === 'number' ? data.payload.ci : false;
        const fullName = typeof( data.payload.fullName ) === 'string' && data.payload.fullName.trim().length > 0 ? data.payload.fullName.trim() : false;
        const role = typeof( data.payload.role ) === 'string' && data.payload.role.trim().length > 0 ? data.payload.role.trim() : false;
        const gender = typeof( data.payload.gender ) === 'string' && data.payload.gender.trim().length > 0 ? data.payload.gender.trim() : false;

        if ( !ci )
            return callback( 400, { message : 'Missing the record id to update' } );

        if ( !fullName && !role && !gender )
            return callback( 400, { message : 'Missing required fields or not valid' } );

        const dataExist = await file.read( { file : 'staff', ext : 'json' } );
        
        if ( dataExist instanceof ErrorFile ) 
            return callback( 500, { message : 'The file USERS does not exist' } );
        
        const updateRegister = dataExist.filter( element => element.id === id )[ 0 ];

        if ( ci ) {
            updateRegister.firstName = firstName;
        }
        if ( fullName ) {
            updateRegister.lastName = lastName;
        }
        if ( role ) {
            updateRegister.email = email;
        }
        if ( gender ) {
            updateRegister.hashedPassword = utils.hash( password );
        }

        const dataAvailable = dataExist.filter( element => element.id !== id );
        dataAvailable.push( updateRegister );
        const dataUpdate = await file.update( { file : 'staff', data : dataAvailable, ext : 'json' } );
        
        if ( dataUpdate instanceof ErrorFile ) 
            return callback( 500, { message : 'The file STAFF does not exist' } );

        callback( 200, { message : 'The register was updated successfully!' } );

    },
    delete : async( data, callback ) => {
        const ci = typeof( data.payload.email ) === 'number'  ? data.payload.ci : false;

        if ( !ci )
            return callback( 400, { message : 'Missing the record id to update' } );

        const dataExist = await file.read( { file: "staff", ext : 'json' } );

        if ( dataExist instanceof ErrorFile ) 
            return callback( 500, { message : 'The file USERS does not exist' } );
        
        const dataAvailable = dataExist.filter( element => element.id !== id );
        const dataUpdate = await file.update( { file : 'staff', data : dataAvailable, ext : 'json' } );

        if ( dataUpdate instanceof ErrorFile ) 
            return callback( 500, { message : 'The file STAFF does not exist' } );

        callback( 200, { message : 'The register was deleted successfully!' } );
    }
};

module.exports = staff;