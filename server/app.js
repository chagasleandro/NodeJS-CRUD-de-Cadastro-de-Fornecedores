const express = require("express");
const cors = require("cors");
const routes = require("./routes"); 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


class Server{
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(cors());
        this.server.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
    
    routes(){
        this.server.use(routes);
    }
}
module.exports = new Server().server;
