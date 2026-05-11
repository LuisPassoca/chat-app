import type { WebSocketServer } from "ws";

let wss: WebSocketServer

export const currentServer = {
    set: (instance: WebSocketServer) => { wss = instance },
    get: (): WebSocketServer => {
        if (!wss) { throw new Error('WebSocketServer not initialized properly!') }
        return wss
    }
}