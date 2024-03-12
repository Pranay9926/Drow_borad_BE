import { io } from "socket.io-client";

export const socket = io("http://192.168.100.208:5001");


export function generateRandomRoomId(length: number = 6): any {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let roomId = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        roomId += characters.charAt(randomIndex);
    }
    console.log(roomId, "room");
    return roomId;
}