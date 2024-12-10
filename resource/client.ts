import type { Packet, DataValue, Data, Inputs} from "./types.js";
import { SHARD_TYPES } from './data.js';

interface Client {
    // Methods
    build: Function

    sendPacket: Function
    sendInputs: Function

    // Socket
    socket: WebSocket
    connectEvent: Function
    receiveEvent: Function
    closeEvent: Function
    errorEvent: Function

    // Data

    shard_types: string[]

    data: Data
    inputs: Inputs

    id: string
}

export function ClientBuilder(
    this: Client,
    socket_url: string, 
) {    
    this.socket = new WebSocket(socket_url);
    this.shard_types = SHARD_TYPES;

    this.data = {};
    this.inputs = { mouse: [], keyboard: []};

    let self=this;
    this.receiveEvent = function receiveEvent(e: MessageEvent) {
        let raw_packet: string = e.data;
        let packet: Packet = JSON.parse(raw_packet);

        for (let shard of packet) {

            switch (shard.type) {
                // INIT_PACKET
                case "CREATE_DATA_VALUE":
                    if (shard.data.data_type !== "GENERIC_DATA") {
                        console.error("CREATE_DATA_VALUE had invalid data!");
                        return;
                    }
                    
                    let key_to_store = shard.data.title;

                    if (key_to_store === null) {
                        console.error("CREATE_DATA_VALUE had invalid data!");
                        return;
                    }
                
                    self.data[key_to_store] = shard.data.value;

                    break;

                case "CREATE_INPUT_VALUE":

                    if ( shard.data.data_type === "KEYBOARD_INPUT" ) {

                        self.inputs.keyboard.push(shard.data.value);

                    } else if ( shard.data.data_type === "MOUSE_INPUT" ) {

                        self.inputs.mouse.push(shard.data.value);

                    } else {
                        console.error("Input type isn't key or mouse!")
                    }

                    break;

                case "SET_CLIENT_ID":

                    self.id = shard.data.value

                    break;


                // DATA_PACKET
                case "MODIFY_DATA_VALUE":
                    if (shard.data.data_type !== "GENERIC_DATA") {
                        console.error("MODIFY_DATA_VALUE was given invalid data!");
                        return;
                    }
                    if (shard.data.title === null) {
                        console.error("MODIFY_DATA_VALUE was given invalid data!");
                        return;
                    }

                    let key_to_set = shard.data.title;
                    let value_to_set = shard.data.value;

                    if (key_to_set in self.data) {
                        self.data[key_to_set] = value_to_set;
                    } else {
                        console.error("Data key",key_to_set,"doesn't exist on client!")
                    }

                    break;
                
            }

        }


    }

    this.closeEvent = function closeEvent(e: CloseEvent) {
        throw "Server closed the connection!"
    }

    function errorEvent(e: Event) {
        console.error(e);
    }

    this.socket.addEventListener('message', (m: MessageEvent) => {this.receiveEvent(m)});
    this.socket.addEventListener('close', (c: CloseEvent) => {this.closeEvent(c)});
    this.socket.addEventListener('error', errorEvent);


    this.sendPacket = function sendPacket(packet: Packet){
        for (let shard of packet) {
            if (shard.type !== "INPUT_VALUE"){ 
                console.error("Requested packet to send has invalid shards! Check permissions...")
            }
        }

        let raw_packet = JSON.stringify(packet);
         
        this.socket.send(raw_packet)
    }

    return this
}