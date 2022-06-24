const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');


class Server {

    constructor(){

        //Express / Port
        this.app = express();
        this.port = process.env.PORT;

        // HTTP SERVER
        this.server = http.createServer(this.app);

        //CONFIGURACION SOCKETS
        this.io = socketio(this.server, {/* configuraciones */});
    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname, '../public')));
    }

    socketsSetting(){
        new Sockets(this.io);
    }

    execute(){
        //Inicializar Middlewares
        this.middlewares();

        //Inicializar sockets

        this.socketsSetting();

        //Inicializacion del servidor http
        this.server.listen(this.port, () =>{
            console.log(`Server corriendo en el puerto`, this.port);
        });
    }

}



module.exports = Server;