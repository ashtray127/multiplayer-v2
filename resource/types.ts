export interface Point {
    x: number,
    y: number
}

// RESULTS --------------------------------
export enum Result { 
    Ok,
    Err
}

// RETURN CODES ---------------------------
export interface ReturnCode {
    code: number,
    title: string,
    description: string
}
export interface ReturnCodes {
    [key: string]: ReturnCode
}

// PACKETS --------------------------------
export interface Packet {

}
export interface Shard {
    name: string,
}


export interface PacketTypes {
    [key: string]: PacketType
}
export interface PacketType {
    name: string,
    handler: Function
}
export interface ShardTypes {
    [key: string]: Shard
}

// MISC ------------------------------
interface Option {
    data: any|null
    type: Result

    unwrap: Function
    unwrapOr: Function
    expect: Function
}

export function Option(this: Option, data:any=null) {

    if (data === null){
        this.type = Result.Err;
    } else {
        this.type = Result.Ok;
    }
    this.data = data;

    this.unwrap = function unwrap(){
        switch (this.type) {
            case Result.Ok:
                return this.data;
                break;
            case Result.Err:
                throw "Requested unwrap of result with type: Result.Err";
                break;
        }
    }

    this.unwrapOr = function unwrapOr(or_data: any) {
        switch (this.type) {
            case Result.Ok:
                return this.data;
                break;
            case Result.Err:
                return or_data;
                break;
        }
    }

    this.expect = function expect(info: string) {
        switch (this.type) {
            case Result.Ok:
                return this.data;
                break;
            case Result.Err:
                throw info;
                break;
        }
    }

    return this;
}
