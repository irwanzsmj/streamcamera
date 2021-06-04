const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const app = express();

const WS_PORT  = 65080;
const HTTP_PORT = 80;

const cameraServer = new WebSocket.Server({port: WS_PORT}, ()=> console.log(`WS Server is listening at ${WS_PORT}`));

let connectedClients = [];
cameraServer.on('connection', (ws, req)=>{
    console.log('Connected');
    connectedClients.push(ws);

    ws.on('message', data => {
        connectedClients.forEach((ws,i)=>{
            if(ws.readyState === ws.OPEN){
                ws.send(data);
            }else{
                connectedClients.splice(i ,1);
            }
        })
    });
});

app.get('/cameraclient',(req,res)=>res.sendFile(path.resolve(__dirname, './cameraclient.html')));
app.listen(HTTP_PORT, ()=> console.log(`HTTP server listening at ${HTTP_PORT}`));