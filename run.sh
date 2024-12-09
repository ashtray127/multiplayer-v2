clear
IFS=

npx tsc

# Execute stuff

npx tsx --no-warnings ./run/server_exe.ts &

http-server ./remote/ --cors -c-1 -p 3000


# After exit 
pkill node
pkill http-server