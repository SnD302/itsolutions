var chalk = require( "chalk" );
var cluster = require( "cluster" );
var os = require( "os" );
if ( cluster.isMaster ) {
    console.log( chalk.red( "[Cluster]" ), "Master process is now running.", process.pid );
    for ( var i = 0, coreCount = os.cpus().length ; i < coreCount ; i++ ) {
        var worker = cluster.fork();
    }
    cluster.on(
        "exit",
        function handleExit( worker, code, signal ) {
            console.log( chalk.yellow( "[Cluster]" ), "Worker has died.", worker.process.pid );
            console.log( chalk.yellow( "[Cluster]" ), "Death was suicide:", worker.exitedAfterDisconnect );
            if ( ! worker.exitedAfterDisconnect ) {
                var worker = cluster.fork();
            }
        }
    );
} else {
    require( "./server" );
    console.log( chalk.red( "[Worker]" ), "Worker has started.", process.pid );
}
