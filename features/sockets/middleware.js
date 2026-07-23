import jwt from 'jsonwebtoken';
import { service } from './socketService.js';


const authenticateConnection = (io)=>{
    io.use(async (socket,next)=>{
      const token = socket.handshake.auth?.token;
      if(!token) return next(new Error('Authentication error: no Token'));
    
      try {
        const decoded = jwt.verify(token, process.env.APIKEY);
        const result = await service.getUser(decoded.id)
        socket.user = result;
        next()
      } catch (err) {
        console.error({
            message: err.message,
            method: req.method,
            path: req.originalUrl,
            stack: err.stack,
        });
        return next(new Error("Authentication error: Invalid token"));
      }
    })
}
export{
    authenticateConnection
}