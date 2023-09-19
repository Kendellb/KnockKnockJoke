//A client for the Knock Knock Protocol
//Port 25564
//node KnockKnockClient.js 
//use ctrl-d to close client

import net from "net"
import readline from "readline"

const client = new net.Socket()
client.connect(25564, process.argv[2] ?? "localhost", () => { 
    console.log("Connected to server")
})
client.on("data", (data) => {
    console.log(data.toString("utf-8"))
})

const reader = readline.createInterface({ input: process.stdin })
reader.on("line", (line) => {
    client.write(`${line}\n`)
})

reader.on("close", () => {
    client.end()
})

