const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.send("hello world");
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`helloworld: listening on port ${port}`);
});