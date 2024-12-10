import type { Packet } from './types.js';


export var SHARD_TYPES: string[] = [
    // INIT_PACKET
    "CREATE_DATA_VALUE",
    "CREATE_INPUT_VALUE",
    "SET_CLIENT_ID",

    // DATA_PACKET
    "MODIFY_DATA_VALUE",

    // INPUT_PACKET
    "INPUT_VALUE",
]