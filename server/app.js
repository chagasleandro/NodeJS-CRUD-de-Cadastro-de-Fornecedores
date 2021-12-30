const express = require("express");
const cors = require("cors");
const routes = require("./routes"); 

class Server {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use((req, res, next) => {
      res.header("Access-Control-allow_origin", "*");
      res.header("Access-Control-Allow-Header", "Origin, X-Requested-with, Content-Type, Accept");
      next();
    });
    this.server.use(express.json());
}
  routes() {
    this.server.use(routes);
  }
}
module.exports = new Server().server;