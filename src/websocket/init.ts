import type { Server } from "http";
import { WebSocketServer } from "ws";
import { currentServer } from "./store.js";
import { onConnection } from "./events/conenction.js";

export function wssInit(server: Server) {
   const wss = new WebSocketServer({ server }) 
   currentServer.set(wss)

   wss.on('connection', onConnection)
}