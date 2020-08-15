
export {};
const ws = require("ws");
const socket_server_port = 5000;

const wss= new ws.Server({
    "port": socket_server_port
});

var connected = {
    //id: websocket connection
};
wss.on("connection", (ws: WebSocket, req: Request)=>{
    var id = req.body.id;
    connected[id] = ws;
    console.log("websocket connected");
});

function sendMessage(id, message){
    connected[id].sendMessage(message);
}

module.exports = {
    
};