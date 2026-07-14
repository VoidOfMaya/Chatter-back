import { Server } from 'socket.io';
//controller
const setOnlineStatus =(socket) =>{
    let user= null;
    socket.on('is_online',(data)=>{
        user = data.id
        console.log(`user ${data.userId}logged in`)
        setTimeout(()=>{
            console.log(`sending response`)
            socket.emit('response',{
                message: `user at ${data.userId}, PONG response`
            })
        },5000)
    })
    //console.log(`user ${data.userId}loggerd in`)
}
export{
    setOnlineStatus
}