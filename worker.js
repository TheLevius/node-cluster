const http = require('http');
const pid = process.pid;
const PORT = 8000;

http
    .createServer((req, res) => {
        for (var i = 0; i < 1e7; i++) {}
        res.end(`Hello from Node.js1\n`)
    })
    .listen(PORT, 'localhost', (err) => {
        err ?
            console.error(err) :
            console.log(`Server started on port: ${PORT}. Pid: ${pid}`);

    })