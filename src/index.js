import http from "http";
import app from "./app.js";

const port = 23344;
const server = http.createServer(app);

server.listen(port);