import { Server, Socket } from 'socket.io';


export const initializeSocket = (server: any) => {
    console.log("hello all");

    const io = new Server(server, {
        // allowEIO3: true,
        cors: {
            origin: ["http://192.168.101.165:3000", "http://192.168.100.208:3000", "http://192.168.101.208:5001"],
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('createRoom', (data) => {
            console.log("creating room", data);

            socket.join(data.roomId);
            console.log(`User joined room ${data.roomId}`);
            socket.emit('success', data);
        });

        socket.on('joinRoom', (data) => {
            const room = io.sockets.adapter.rooms.get(data.roomId);
            if (!room || room.size === 0) {
                socket.emit('error', "Room does not exist or is mepty");
                console.log("error massage");

            } else {
                console.log(`User joined roomaksdjf;lkasdjf;lkasdjf;lkasd ${data.roomId}`);
                socket.join(data.roomId);
                socket.emit('success', data);
            }
        });

        socket.on("canvasData", (data) => {
            console.log("info", data.roomId);

            // Check if the socket is in the specified room before sending the message
            if (socket.rooms.has(data.roomId)) {
                socket.to(data.roomId).emit("canvasDataResponse", data);
            } else {
                console.log(`Socket ${socket.id} is not in room ${data.roomId}`);
            }
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    return io; // Return the io instance
};