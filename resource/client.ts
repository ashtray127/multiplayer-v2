import type { Packet } from "./types.js";

interface Client {
    // Methods
    build: Function
    updateConnectFunc: Function
    updateReceiveFunc: Function
    updateCloseFunc: Function
    updateErrorFunc: Function

    // Values
    socket: WebSocket
    connect_func: Function|null
    receive_func: Function|null
    close_func: Function|null
    error_func: Function|null
}

export function Client(
    this: Client,
    socket_url: string, 
    connect_func: Function|null = null, 
    receive_func: Function|null = null, 
    close_func: Function|null = null, 
    error_func: Function|null = null, 
) {    
    this.socket = new WebSocket(socket_url);

    let connect_to_use: Function = connect_func === null? baseConnectFunc : connect_func;
    function connectEvent(e: Event) { 
        connect_to_use(e);
    }

    let receive_to_use: Function = receive_func === null? baseReceiveFunc : receive_func;
    function receiveEvent(e: MessageEvent) {
        receive_to_use(e);
    }

    let close_to_use: Function = close_func === null? baseCloseFunc : close_func;
    function closeEvent(e: CloseEvent) {
        close_to_use(e);
    }

    let error_to_use: Function = error_func === null? baseErrorFunc : error_func;
    function errorEvent(e: Event) {
        error_to_use(e);
    }


    this.socket.addEventListener('open', connectEvent);
    this.socket.addEventListener('message', receiveEvent);
    this.socket.addEventListener('close', closeEvent);
    this.socket.addEventListener('error', errorEvent);


    this.updateConnectFunc = function updateConnectFunc(new_func: Function) {
        connect_to_use = new_func
    }
    this.updateReceiveFunc = function updateReceiveFunc(new_func: Function) {
        receive_to_use = new_func
    }
    this.updateCloseFunc = function updateCloseFunc(new_func: Function) {
        close_to_use = new_func
    }
    this.updateErrorFunc = function updateErrorFunc(new_func: Function) {
        error_to_use = new_func
    }

    return this
}

function baseConnectFunc(event: Event){
    console.log("Connected!");
}
function baseReceiveFunc(data: MessageEvent){
    console.log("Received: %s", data);
}
function baseCloseFunc(event: CloseEvent){
    console.log("Closed!")
}
function baseErrorFunc(error: Event) {
    console.error(error);
}