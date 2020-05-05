const moment = require('moment');
const Chats = require('./models/Chats');

module.exports = (single) => {

    let users = {};
    single.on('connection', async socket => {
        console.log('new connected');

        socket.on('joinRoom', async (usuarios) => {
          try {
            const {usuarioRecibe, usuarioEnvia} = usuarios;
            
            socket.usuarioRecibe = usuarioRecibe;
            socket.nickname = usuarioEnvia;
            users[socket.nickname] = socket;

          } catch (error) {
              console.log(error);
          }
        });

        socket.on('show mess', async(datosRecibe) => {
            console.log(datosRecibe);
            let messages = await Chats.findAll({where: {nick: datosRecibe.nick, recibe: datosRecibe.recibe}});
            let messages1 = await Chats.findAll({where: {nick: datosRecibe.recibe, recibe: datosRecibe.nick}});

            socket.emit('load old msgs', messages, messages1);

        });
        
  

        //este data viene de main
        socket.on('send-message', async function(data, cb) {
            console.log(data);
            const fecha = moment().format('MMMM Do YYYY, h:mm:ss a');
            try {
                var msg = data.trim();
                if (msg.substr(0,3) === '/w ') {
                    msg = msg.substr(3);
                    const index = msg.indexOf(' ');
                    if (index !== -1) {
                        var name = msg.substring(0, index);
                        var msg = msg.substring(index + 1);
                        if (name === socket.usuarioRecibe) {
                            users[name].emit('whisper', {
                                msg,
                                envia: socket.nickname,
                                fecha
                            });
                            var newMsg = {
                                msg,
                                nick: socket.nickname,
                                recibe: socket.usuarioRecibe
                            };
                            //console.log(newMsg);
                            await Chats.create(newMsg);
                        }else{
                            cb('Error, ingrese un usuario');
                        }
                    }else{
                        cb('error ingrese mensaje');
                    }
                }else{
                
                    single.sockets.emit('new message', {
                        msg: data,
                        envia: socket.nickname,
                        fecha
                    }); 
                }
            } catch (error) {
                console.log(error);
            }
        });
    });
};