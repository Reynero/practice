const users = require("../endpoints/users.js");
const products = require("../endpoints/products.js");
const purchases = require("../endpoints/purchases");

const obtainHandler = ( moduleHandler, acceptableMethods ) => {
    return( ( data, callback ) => {
        if ( acceptableMethods.indexOf( data.method ) > -1 ) {
            moduleHandler[ data.method ]( data, callback );
        } else {
            callback ( 405 );
        }    
    });
};

// Define a request router
const handlers = {
    //Users
    users: obtainHandler(users, ["options", "get", "put"]),
    //product
    products: obtainHandler(products, ["options", "get", "put"]),
    //purchases
    purchases: obtainHandler(purchases, ["options", "get", "put"]),
    // Ping handler
    ping :  ( data, callback ) => {
        const responseMessage = {
            message : 'PONG'
        };
        callback( 200, responseMessage );
    },
    // Hello handler
    hello :  ( data, callback ) => {
        const responseMessage = {
            message : 'Hi, this is the first homework'
        };        
        callback( 200, responseMessage );
    },
    // Not found handler
    notFound :  ( data, callback ) => { 
        callback( 404 );
    
    },
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
module.exports = handlers;