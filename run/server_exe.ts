import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

interface MySocket extends WebSocket { // Typescript is angry for no reason, this fixes it
    on: Function
}

wss.on('connection', function connection(ws: MySocket) {

    ws.on('error', console.error);
  
    ws.on('message', function message(data: string) {
      console.log('received: %s', data);
    });
  
    ws.send('something');
  });