
const express = require('express');
const request = require('request');


const PORT = process.env.NODE_PORT || 2000;
const app = express();

const id = Math.floor(Math.random() * 200);

app.use('/', (req, res) => {
    console.log('req', PORT, id);
    res.send(`Hello from Sender on port: ${PORT} id:${id}`);
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

setInterval(() => {
    console.log(PORT, id);


    request('http://ms_reciever:2000/request', (error, response, body) => {
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
    });

}, 5000);



const Connector = require('./src/Connector');


const connector = new Connector({
    hostname: 'rabbitmq',
    port: '5672',
    username: 'guest',
    password: 'guest',
    mainQueue: 'sender-queue',
    rpcQueue: 'sender-queue-rpc',
});

connector.init()
    .then(async ({ channel }) => {

        setInterval(async () => {

            // await connector.push('ms2-queue', 'myPushEvent', {
            //     message: 'Ms-1 Connected ' + new Date().valueOf()
            // }); //OR

            await connector.rpc('reciever-queue', 'myRpcEvent', {
                message: 'Ms-1 Connected ' + new Date().valueOf()
            })
                .then(({ data, ack }) => {
                    console.log('RPC Response calls Promise.resolve');
                    console.log(data);
                    ack();//removes message from queue

                })
                .catch((err) => {
                    console.log(err);
                });


        }, 6000);

    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    })


process.on('SIGINT', function () {
    connector.closeConnection();
    process.exit(1);
});