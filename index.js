/* const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`)) */


  const express = require('express');
const webSocket = require('ws');

const socketServer = webSocket.Server;

const server = express().listen(2498);

express().get('/', (req,res) => {
    res.json({message:"Enter your port adress to get started"})
});

const webSocketServer = new socketServer({ server });

webSocketServer.on('connection', (ws) => {

    console.log('[SERVER]: A Client was connected successfully');

    ws.on('close', () => {

    console.log('[SERVER]: Client disconnected');
    })

    ws.on('message', (message) =>{
    console.log('[SERVER]: Received a message => %s', message );

    // broadcast message to all function
    webSocketServer.clients.forEach(function per(client){
        if(client !== ws && client.readyState === webSocket.OPEN){
            client.send(message);
            console.log("Broadcast msg: "+ message);
        }
        client.send('Youre receiving this message cos youre on our network')
    })

    })


})
