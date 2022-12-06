// Define a request router
const handlers = {
    // Ping handler
    ping :  ( data, callback ) => {
        callback( 200 );
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
    users: (data, callback) => {
        const user = {
            name: "Reynero",
            lastname: "Torrico",
            age: 26,
            
        }
        callback(200, user)
    },

};
module.exports = handlers;