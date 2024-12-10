// PACKETS --------------------------------
export type Packet = Shard[]

export type Data = {
    [key: string]: DataValue
}
export type Inputs = {
    mouse: DataValue[]
    keyboard: DataValue[]
}


export type Shard = {
    type: string,
    data: DataValue
}

export type DataValue = {
    data_type: string,
    title: string|null,
    value: any
}

export type ClientData = {
    id: string,
    data: {[key: string]: any}
}

export type ClientList = {
    [key: string]: ClientData
}