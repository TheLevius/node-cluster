const cluster = require('cluster');
const os = require('os');
const pid = process.pid;

if (cluster.isMaster) {
    const cpusCount = os.cpus().length
    console.log(`CPUs: ${cpusCount}`);
    console.log(`Master started. Pid: ${pid}`);
    for (var i = 0; i < cpusCount - 1; i += 1) {
        const worker = cluster.fork();
        worker.on('exit', () => {
            console.log(`Worker died! Pid: ${worker.process.pid}`);
            cluster.fork();
        })
        worker.send(`Hello from server!`);
        worker.on('message', (msg) => {
            console.log(`Message from worker ${worker.process.pid} : ${JSON.stringify(msg)}`);
        })
    }

}
if (cluster.isWorker) {
    require('./worker');
    process.on('message', (msg) => {
        console.log(`Message from master: ${msg}`);
    })
    process.send({
        text: 'Hello',
        pid
    });
}