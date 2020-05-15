const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const passport = require('./config/passport');
const http = require('http');
const socketio = require('socket.io');
const router = require('./routes');

//Creacion de las tablas
const db = require('./config/db');
    require('./models/Usuarios');
    require('./models/Categorias');
    require('./models/Estrategias');
    require('./models/Chats');
    require('./models/Grupos');
    require('./models/Sentimientos');
    require('./models/datosSalud');
    require('./models/Horarios');
    require('./models/Citas');
    require('./models/Reportes');

    db.sync().then(() => console.log('DB CONECTADA')).catch((error) => console.log(error));

//variables de entorno
require('dotenv').config({path: 'variables.env'});

//funciona la app
const app = express();

//Sockets
const server = http.createServer(app);
const io = socketio.listen(server);
require('./sockets')(io);
require('./socketsSingle')(io);

//Body parser para leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Express validator 
app.use(expressValidator());

//Habilitar ejs como template
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Habilita la direccion de las vistas
app.set('views', path.join(__dirname, './views'));

//archivos estaticos donde cae por default
app.use(express.static('public')); 

//Habilitar cookie parser 
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
}));

//Inicializar passport 
app.use(passport.initialize());
app.use(passport.session());

//Agrega connect flash messsages
app.use(flash());

//Middleware para usarlos en cualquier parte de la app
app.use((req, res, next) => {
    res.locals.usuario = {...req.user} || null;
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
});

//Routing
app.use('/', router());

//Leer host y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

//Servidor por donde se escucha
server.listen(port, host, () => {
    console.log('Servidor funcionando');
});