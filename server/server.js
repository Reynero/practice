const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const router = require("./router.js");
const handlers = require("./handler.js");

const httpServer = http.createServer((req,res) => {
    const requestedUrl = url.parse(req.url,true);
    //this is storing the url as an object into requestedUrl
    const path = requestedUrl.pathname;
    //now from that object we are extracting the path 
    const trimedPath = path.replace(/^\/+|\/+$/g,"");
    //here we are cleaning the URL
    const queryStringObj = requestedUrl.query;
    //here we are storing the rest of the url after the ? sign
    const method = req.method.toLowerCase();
    //stores the requested method
    const header = req.headers;
    //inside headers there is the additional info from the client, server, from the requested page, ect. 
    //this depends on the side that is requesting 
    const decoder = new StringDecoder("utf-8");
    //this is just decoding everything to utf-8 format
    let buffer = "";
    req.on("data",data=>{
        //.on just binds an event to the object
        buffer = decoder.write(data);
        //write function writes the data already decoded
    });
    req.on("end",()=>{
        buffer = decoder.end();
        //Returns what remains of the input stored in the internal buffer
        const chosenHandler = typeof(router[trimedPath]) !== "undefined"?router[trimedPath]:handlers.notFound;
        const data = {
            trimedPath,
            queryStringObj,
            method,
            header,
            payload: buffer
        }
        chosenHandler(data,(statusCode, payload)=>{
            statusCode = typeof(statusCode) === "number"?statusCode:200;
            payload = typeof(payload) === "object"?payload:{};
            //consists of HTTP protocol information such as headers, a URL, body content, and version and status information
            const payloadString = JSON.stringify(payload);
            //here we are converting the value into a JSON (js object notation)
            res.setHeader("Content-Type","application/json");
            res.writeHead(statusCode);
            //here we are writing the response of the server in the webpage
            res.end(payloadString);
        });
    });
});

const initHTTP = {
    init(){httpServer.listen( 3200,  () => {
        console.log( 'The server is listening on port: ', 3200 );
        
    })} 
}
module.exports = initHTTP;