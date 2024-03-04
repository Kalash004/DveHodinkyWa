// ##########
// BASE CONFIG
// ##########
import express from 'express';
import authRouter from './router/auth.js';
import apiRouter from './router/api.js';
import wsRouter,{mountRouter} from './router/socket.js';
import expressWs from "express-ws";
import sessions from "express-session";
import cookieParser from "cookie-parser";
import {checkIfAuthenticated} from "./functions/authentication.js";
import config from "./config.js"; 
import path, {dirname} from 'path';
import { fileURLToPath } from "url";

   
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const host = config.server.hostname;
const port = config.server.port;


// Create server (app)
const server = express();

server.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
   
server.use(express.json());
server.use(express.urlencoded({extended : true}));
server.use(cookieParser());
server.use(sessions({
    secret: config.sessionSecret,
    resave:false,
    saveUninitialized:false
}))

// ##########
// ROUTING
// ##########
 
// Load Public (css,js,resources)
server.use(express.static(path.join(__dirname,'/public')));

server.get("/favicon.ico",(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/resources/favicon.ico'));
})

// // Base routes

server.get('/',checkIfAuthenticated,(req,res)=>{
    res.status(200);
    res.set('Content-Type','text/html');
    res.sendFile(path.join(__dirname,'/views/'));
});


expressWs(server);


// Routers from router/
mountRouter();
server.use(wsRouter);
server.use(authRouter);
server.use(apiRouter);

// No route found
server.use('*',(req,res) => {
    res.status(404);
    res.set('Content-Type','text/html');
    res.sendFile(path.join(__dirname,'public/views/404_schoolServer.html'));
});


// Server starts listenning
// ==================================
server.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}. Awaiting connections.`);
});
