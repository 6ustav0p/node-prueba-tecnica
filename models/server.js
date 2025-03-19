const express = require('express');
const { dbMongo } = require('../database/dbConnection');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.server = require('http').createServer(this.app);

        this.paths = {
            usuarios: '/api/usuarios',
        }

        // Conectar a base de datos
        this.conectarMongo();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
    }



    async conectarMongo() {

        await dbMongo();


    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

    }


    routes() {

        this.app.use(this.paths.usuarios, require('../routes/usuarios'));

    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}

module.exports = Server;


