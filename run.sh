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

# mkdir ./remote-tmp

# mv ./remote/compiled/remote/uncomp/ ./remote-tmp

# rm -rf ./remote

# mkdir ./remote

# mv ./remote-tmp ./remote

# rm -rf ./remote-tmp

# echo "Fixing compiled code..."

# COMP_CLIENT_CODE=$(cat ./remote/client.js)

# COMP_CLIENT_CODE=`echo $COMP_CLIENT_CODE | sed 's/Object.defineProperty(exports, "__esModule", { value: true });/""/g'`

# echo $COMP_CLIENT_CODE > ./remote/client.js

# echo "Waiting for clients..."

# npx tsx --no-warnings ./resource/server.ts &

# http-server ./remote/ --cors -c-1 -p 3000

# pkill node
# pkill http-server