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
//import KnockJoke from "./KnockKnockFunction.js";

var jokes = [
    {name: 'Hatch', answer: 'Bless you!'}
]

var Lang = [ {name:'EN' ,response:'Knock Knock'},
             {name:'FR' ,response:'Knock Knock in fr'}
]

var state = " "

const server = net.createServer((socket) => {
    console.log("Connection from", socket.remoteAddress, "port", socket.remotePort)

    socket.on("data", (buffer) => {
        console.log("Request from", socket.remoteAddress, "port", socket.remotePort)
        //socket.write(`${buffer.toString("utf-8").toUpperCase()}\n`)
        if (buffer.toString("utf-8").includes("290")){
            if(Lang.find(item => buffer.toString("utf-8").toUpperCase().includes(item.name))){
                socket.write("200 "+Lang.find(item => buffer.toString("utf-8").toUpperCase().includes(item.name)).response)
               state = "SENDKNOCKJOKE"
            }
        }
        var joke = jokes[Math.floor(Math.random()*jokes.length)]

                if(state === "SENDKNOCKJOKE"){
                    if (buffer.toString("utf-8").includes("210")){
                        socket.write("220 "+joke.name)
                        state = "SENDRESPONSE"
                    }
                }
                else if(state === "SENDRESPONSE"){
                    if (buffer.toString("utf-8").includes("230")){
                        socket.write("240 "+joke.answer)
                        socket.end()
                    }
                }
                
                
            
            else socket.write('ERROR 501:Language not Avialible')
        

})
    socket.on("end", () => {
    console.log("Closed", socket.remoteAddress, "port", socket.remotePort)
    })
})




server.maxConnections = 20
server.listen(25564)
