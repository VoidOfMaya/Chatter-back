import { Server } from 'socket.io';
//controller
const setOnlineStatus = (socket) =>{
    let user= null;
    socket.on('is_online',(data)=>{
        user = data.id
        console.log(`user ${data.userId}loggerd in`)
    })
    setTimeout(()=>{
        socket.emit('response',()=>{
            console.log(`sending response`)
            return {message: `user at ${user}, PONG response`}
        })
    },5000)
    //console.log(`user ${data.userId}loggerd in`)
}
export{
    setOnlineStatus
}