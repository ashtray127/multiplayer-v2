import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });


// wss.on('connection', function connection(ws: WebSocket) {
//     ws.addEventListener('error', console.error);

//     ws.addEventListener('message', function message(msg: MessageEvent) {
//         console.log("Received: %s", msg )

//     })
// })

