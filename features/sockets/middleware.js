import jwt from 'jsonwebtoken';

const authenticateConnection = (io)=>{
    io.use((socket,next)=>{
      const token = socket.handshake.auth?.token;
      if(!token) return next(new Error('Authentication error: no Token'));
    
      try {
        const decoded = jwt.verify(token, process.env.APIKEY);
        socket.user = decoded;
        next()
      } catch (err) {
        return next(new Error("Authentication error: Invalid token"));
      }
    })
}
export{
    authenticateConnection
}