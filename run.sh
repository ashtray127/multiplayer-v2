echo "Server starting..."

IFS=

CLIENT_CODE=$(cat ./client/client.mjs)

CLIENT_REPLACE_CLASS=`echo $CLIENT_CODE | sed 's/export class/class/g'`

CLIENT_REPLACE_CONST=`echo $CLIENT_REPLACE_CLASS | sed 's/export const/const/g'`

CLIENT_REPLACE_FUNC=`echo $CLIENT_REPLACE_CONST | sed 's/export function/function/g'`

CLIENT_FINAL_COMMON=`$CLIENT_REPLACE_FUNC`

echo $CLIENT_FINAL_COMMON > ./client/client.cjs

echo "Wrote client code..."

DATA_CODE=$(cat ./resource/data.mjs)

DATA_REPLACE_CLASS=`echo $DATA_CODE | sed 's/export class/class/g'`

DATA_REPLACE_CONST=`echo $DATA_REPLACE_CLASS | sed 's/export const/const/g'`

DATA_REPLACE_FUNC=`echo $DATA_REPLACE_CONST | sed 's/export function/function/g'`

DATA_FINAL_COMMON=`$DATA_REPLACE_FUNC`

echo $DATA_FINAL_COMMON > ./client/client.cjs

echo "Wrote data code..."

echo "Waiting for clients..."

node server.js
