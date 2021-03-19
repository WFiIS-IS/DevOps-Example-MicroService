//Reciever

const express = require('express');


const PORT = process.env.NODE_PORT || 2000;
const app = express();

const id = Math.floor(Math.random() * 200);


app.use('/request', (req, res) => {
    console.log('request', PORT, id);
    res.send(`RESPONSE on port: ${PORT} id:${id}`);
})

app.use('/', (req, res) => {
    console.log('req', PORT, id);
    res.send(`Hello from Reciever on port: ${PORT} id:${id}`);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})



const Connector = require('./src/Connector');

const connector = new Connector({
    hostname: 'rabbitmq',
    port: '5672',
    username: 'guest',
    password: 'guest',
    mainQueue: 'reciever-queue',
    rpcQueue: 'reciever-queue-rpc',
});

const connect = async () => {
    try {
        await connector.init();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }


    connector.on('myPushEvent', ({ data, ack }) => {
        console.log(data);

        ack();//removes message from queue
    });

    connector.on('myRpcEvent', ({ data, ack, respond }) => {
        console.log(data);

        if (data.type == "RPC") {
            respond({ message: 'OK' });
        }

        ack();//removes message from queue
    });

    connector.on('unregistered', ({ data, ack }) => {//handling unregistered events
        console.log('Unregistered Event');
        ack();
    });

}
connect();


process.on('SIGINT', function () {
    connector.closeConnection();
    process.exit(1);
});



setInterval(() => {
    console.log(PORT, id);
}, 5000);