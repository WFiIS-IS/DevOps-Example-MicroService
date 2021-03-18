
const express = require('express');

const PORT = process.env.NODE_PORT || 2000;
const app = express();

app.get('/', (req, res) => {
    res.send(`Hello from service on port: ${PORT}`);
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})