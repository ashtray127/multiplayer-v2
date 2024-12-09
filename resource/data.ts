import type { ReturnCodes, PacketTypes, PacketType, ShardTypes, ShardType, Packet } from './types.js';

export var RETURN_CODES: ReturnCodes = {

}

export var BASE_PACKET_TYPES: PacketTypes = {

}

export var BASE_SHARD_TYPES: ShardTypes = {

}

export function createPacketType(packet_type: PacketType) { 
    BASE_PACKET_TYPES[packet_type.id] = packet_type
}

export function createShardType(shard_type: ShardType) {
    BASE_SHARD_TYPES[shard_type.id] = shard_type
}