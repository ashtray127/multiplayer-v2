clear
IFS=

# Converts ModuleJS into CommonJS
module_to_common() {
    return_value="$(echo $1 | sed 's/export class/class/g' | sed 's/export function/function/g' | sed 's/export const/const/g')"
}

# Removes the "set object properties wtv"
remove_beginning_compiled() {
    return_value="$(echo $1 | sed 's/Object.defineProperty(exports, "__esModule", { value: true });/""/g')"
}



module_to_common "$(cat ./resource/client.cts)"
echo $return_value > ./remote/client.ts

module_to_common "$(cat ./resource/data.mts)"
echo $return_value > ./remote/data.ts

cp ./resource/types.ts ./remote/types.ts
cp ./resource/server.ts ./remote/server.ts

npx tsc

rm -rf ./remote
mkdir ./remote
mkdir ./remote/lib
mkdir ./remote/exe

remove_beginning_compiled "$(cat ./remote-tmp/remote/client.js)"
echo $return_value > ./remote/lib/client.js

remove_beginning_compiled "$(cat ./remote-tmp/remote/data.js)"
echo $return_value > ./remote/lib/data.js

remove_beginning_compiled "$(cat ./remote-tmp/remote/server.js)"
echo $return_value > ./remote/lib/server.js

remove_beginning_compiled "$(cat ./remote-tmp/remote/types.js)"
echo $return_value > ./remote/lib/types.js

remove_beginning_compiled "$(cat ./remote-tmp/run/server.js)"
echo $return_value > ./remote/exe/server.js

remove_beginning_compiled "$(cat ./remote-tmp/run/sketch.js)"
echo $return_value > ./remote/exe/sketch.js


rm -rf ./remote-tmp


# Execute stuff

npx tsx --no-warnings ./run/server.cts &

http-server ./remote/ --cors -c-1 -p 3000 > /dev/null


# After exit 
pkill node
pkill http-server