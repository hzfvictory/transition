import http from "http";

import app from "./app";

const PORT = process.env.PORT ||9000;
const HOST = process.env.HOST || "0.0.0.0";
const CB = () => console.log("server object listens on port: %d", PORT);

http.createServer(app).listen(PORT, HOST, CB);
