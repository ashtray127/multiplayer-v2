import type { ReturnCodes, PacketTypes, PacketType, ShardTypes, Packet } from './types.js';

export var RETURN_CODES: ReturnCodes = {

}

export var PACKET_TYPES: PacketTypes = {

}

export var SHARD_TYPES: ShardTypes = {

}

export function createPacketType(packet_type: PacketType) { 
    PACKET_TYPES[packet_type.name] = packet_type
}
