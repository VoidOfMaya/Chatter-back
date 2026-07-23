import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { pipe } from './features/routerController.js';
import { midware } from './features/middlewareController.js';
import passport from 'passport';
import{ createServer} from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

//cron token cleaner
import { tokenCleaner,resetSocketData } from './tasks/dbCleaner.js';
import { setOnlineStatus } from './features/sockets/onlineStatus.js';
import { authenticateConnection } from './features/sockets/middleware.js';
import { channelEventHandler } from './features/sockets/channelRoom.js';

const app = express();

const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? [process.env.CLIENT_URL]
        : [
            "http://localhost:5173",
            "http://localhost:4173",
        ];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

//parse req string to json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//passport setup goes here:-
midware.passportConfig();
app.use(passport.initialize());

//parse cookies
app.use(cookieParser());
//routs:-
tokenCleaner(); //runs auto db cleaning function every week!
resetSocketData();//clears volitile socket managed data

app.use('/',pipe.indexRouter) // this houses the read rout for post and comments Comment router will live here!
app.use('/auth', pipe.authRouter)
app.use('/user',midware.isAuthenticated,pipe.userRouter)
app.use('/channel/:channelId',midware.isAuthenticated, pipe.channelRouter)
app.use('/friend',midware.isAuthenticated,pipe.friendRouter)
app.use('/upload',midware.isAuthenticated,pipe.photoRouter)
//error handlers:
//404
app.use((req, res, next)=>{
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
})
//500
app.use((err, req, res, next) => {
  console.error(err);
  console.log(req.method, req.originalUrl);
  return res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

//server wrapper & socket.io implementation
const server = createServer(app)
const io = new Server(server,{
  //defining CORS
  cors:{
    origin:allowedOrigins
  }
});
//authenticate socket
authenticateConnection(io);
//server & socket connection
io.on('connection',(socket)=>{
  //create root
  socket.join(`user:${socket.user.id}`);
  setOnlineStatus(socket, io)
  channelEventHandler(socket, io)
})

//http connection
const PORT = process.env.PORT || 3000;
server.listen(PORT, (err)=>{
    if(err) throw new err ;
    console.log(`Server running on port: ${PORT} (${process.env.NODE_ENV})`);
})
