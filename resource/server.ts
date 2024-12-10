import { WebSocketServer } from 'ws';
import type { DataValue, Inputs, Packet, Shard, ClientData, ClientList } from './types.js'

interface Server {
    wss: WebSocketServer

    clients: ClientList
    
    init_packet: Packet

    // Methods
    sendPacket: Function
}

export function ServerBuilder(
    this: Server,
    data_to_store: DataValue[],
    inputs_to_get: DataValue[],
    client_ids: string[]
) {
    this.wss = new WebSocketServer({ port: 8080 });
    this.clients = {}

    for (let id of client_ids){
        this.clients[id] = {
            id: id,
            data: { 
                connected: false
            }
        }
    }

    for (let data_value of data_to_store) {
        
        if (data_value.data_type !== "GENERIC_DATA") {
            console.error("data_to_store contains invalid data!")
            continue;
        }
        if (data_value.title === null) {
            console.error('data_to_store contains invalid data!')
            continue;
        }

        for (let id in this.clients) {

            let client = this.clients[id];

            client.data[data_value.title] = data_value.value
        }
    }

    this.sendPacket = function sendPacket(client: WebSocket, p: Packet){
        let raw_packet = JSON.stringify(p)

        client.send(raw_packet)
    }
    
    this.init_packet = createInitPacket(data_to_store, inputs_to_get);

    

    let self = this;
    this.wss.on('connection', function connection(ws: WebSocket) {

        self.sendPacket(ws, self.init_packet);

        ws.addEventListener('error', console.error);

        ws.addEventListener('message', function message(msg: MessageEvent) {
            let raw_packet = msg.data 
            let packet: Packet = JSON.parse(raw_packet)

            for (let shard of packet) {
                if (shard.type !== "INPUT_VALUE") {
                    console.error("Client sent an invalid shard!");
                    continue;
                }




            }
            

        })
    })

    return this
}

function createInitPacket(data_to_store: DataValue[], inputs_to_get: Inputs) {
    let packet: Packet = []

    for (let data of data_to_store) {
        let shard: Shard = {
            type: "CREATE_DATA_VALUE",
            data: data
        };

        packet.push(shard)
    }

    for (let input of inputs_to_get.mouse) {

        let shard: Shard = {
            type: "CREATE_INPUT_VALUE",
            data: input
        }

        packet.push(shard)
    }

    return packet;
}
