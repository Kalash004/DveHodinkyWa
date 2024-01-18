import express from 'express'
import socket from "express-ws"

const router = express.Router();
router.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send(msg);
  });
});
