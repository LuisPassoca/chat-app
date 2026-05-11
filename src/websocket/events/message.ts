import type { RawData } from "ws";

export function onMessage(data: RawData) {
    console.log(data.toString())
}