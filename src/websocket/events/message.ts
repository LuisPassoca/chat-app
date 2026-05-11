import type { RawData } from "ws";
import { broadcast } from "../services/broadcast.js";

export function onMessage(data: RawData) {
    const message = JSON.parse(data.toString())
    if (message.type === 'send-message') {
        console.log(message)
        //Forwards message to other clients
        broadcast(message)
    }
}