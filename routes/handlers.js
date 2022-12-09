// Dependencies
const users = require( '../endpoints/users' );
const products = require("../endpoints/products");
const purchases = require("../endpoints/purchases");
const staff = require("../endpoints/staff");
const branches = require("../endpoints/branches");

// Obtain handler acceptable methods for a given handler module
const obtainHandler = ( moduleHandler, acceptableMethods ) => {
    return( ( data, callback ) => {
        if ( acceptableMethods.indexOf( data.method ) > -1 ) {
            moduleHandler[ data.method ]( data, callback );
        } else {
            callback ( 405 );
        }    
    });
};

// Define the handlers
const handlers = {
    // Users
    users : obtainHandler( users, [ 'options', 'get', 'post', "put", "delete" ] ),
    products : obtainHandler( products, ['options', 'get', 'post', "put", "delete"]),
    purchases : obtainHandler( purchases, ['options', 'get', 'post', "put", "delete"]),
    staff : obtainHandler( staff, ['options', 'get', 'post', "put", "delete"]),
    branches : obtainHandler( branches, ['options', 'get', 'post', "put", "delete"]),
    // Ping handler
    ping : ( ( data, callback ) => {
        const responseMessage = {
            message : 'PONG'
        };
        callback( 200, responseMessage );
    } ),
    // Hello handler
    hello : ( ( data, callback ) => {
        const responseMessage = {
            message : 'Hi, this is the first homework'
        };
        callback( 200, responseMessage );
    } ),
    // Not found handler
    notFound : ( ( data, callback ) => { 
        const responseMessage = {
            message : 'NOT FOUND'
        };
        callback( 404, responseMessage );
    } ),
    duck: (data, callback) => {
        const responseMessage = {
            message: "quak",
            message2: "quak quak",
            message3: "quak quak quak"
        }
        callback(200, responseMessage);
    },
    person: (data, callback) => {
        const user = {
            name: "Reynero",
            lastname: "Torrico",
            age: 26,
            
        }
        callback(200, user)
    },
};

// Export the module
module.exports = handlers;


