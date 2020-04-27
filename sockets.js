const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
const moment = require('moment');
const Grupos = require('./models/Grupos');

module.exports = (io) => {
const botName = 'Affectus Chat';

    //Run when client connects
    io.on('connection', socket => {
        //console.log(`New connection in ID: ${socket.id}`);

        socket.on('joinRoom', async ({username, room}) => {
            
            try {
                const user = userJoin(socket.id, username, room);
                socket.join(user.room);
                //console.log(user);

                socket.room = user.room;

                //emite mensaje en la consola o de bienvenido single
                socket.emit('message', formatMessage(botName, 'Welcome to affectus'))

                //Broadcast when a user connects all user
                socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} has joined the chat`))
                // console.log('user room', user.room);

                //Sen users and room info
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                })
            } catch (error) {
                console.log(error);
            }

        })

        socket.on('wait room', async ({room}) => {
            console.log(room);
            let messages = await Grupos.findAll({where: {room: room}});
            socket.emit('load old msgs', messages);
        })
        

        //Listen for chatmessage
        socket.on('chatMessage', async (msg) => {
            try {
                const user = getCurrentUser(socket.id);
           
                const mensaje = {
                    msg: msg,
                    email: user.username,
                    room: user.room
                }
                await Grupos.create(mensaje);
                io.to(user.room).emit('message', formatMessage(user.username,msg));
            } catch (error) {
                console.log(error);
            }
            
        })

        //Runs when cliente disconnects
        socket.on('disconnect', () => {
            const user = userLeave(socket.id);
            if (user) {
                io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

                //Sen users and room info
                io.to(user.room).emit('roomUsers', {
                    room: user.room,
                    users: getRoomUsers(user.room)
                })
            }
        })

    })

}

