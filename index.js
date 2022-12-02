const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

const httpserver = http.createServer((req,res) => {
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
        const chosenHandler = typeof(route[trimedPath] !== "undefined"?route[trimedPath]:handlers.notFound);
        const data = {
            trimedPath,
            queryStringObj,
            method,
            headers,
            payload: buffer
        }
        chosenHandler(data,(statusCode, payload)=>{
            statusCode = typeof(statusCode) === "number"?statusCode:200;
            payload = typeof(payload) === "object"?payload:{};
            const payloadString = JSON.stringify(payload);
            res.setHeader("Content-Type","application/json");
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
});
//error http codes
console.log(payloadString);
console.log(statusCode);