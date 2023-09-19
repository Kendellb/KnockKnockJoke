//Knock, knock.
//Who’s there?
//Hatch.
//Hatch who?
//Bless you!
   //Knock, Knock
//An async function
//Who's there?

//Knock Knock Protocol
//Server -> Client
//  Recive "290 Language"
//  Check if Language is avialible
//  if not avialible 501:language not avialible 
//  else 200:Knock Knock
//  request input 210:Whos there?
//  send joke from an array 220
//  request input 230:joke who?
//  send joke punchline from array 240  
//  close connection
import net from "net"


var jokes = [
    {name: 'Hatch', answer: 'Bless you!'}
]

var lang = [ 'En' ]


const server = net.createServer((socket) => {
    console.log("Connection from", socket.remoteAddress, "port", socket.remotePort)

    socket.on("data", (buffer) => {
        console.log("Request from", socket.remoteAddress, "port", socket.remotePort)
        //socket.write(`${buffer.toString("utf-8").toUpperCase()}\n`)
       return KnockJoke(jokes)
})
    socket.on("end", () => {
    console.log("Closed", socket.remoteAddress, "port", socket.remotePort)
    })
})

function KnockJoke(joke){
    if (buffer.toString("utf-8").includes("290"){
        socket.write(`{$buffer.toString("utf-8")}\n`)
    }
    else socket.write('501:Language not Avialible')

}


server.maxConnections = 20
server.listen(25564)
