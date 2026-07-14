import { service } from "./socketService.js"; 
//controller
const setOnlineStatus =(socket) =>{
    socket.on('is_online',async(data)=>{

        console.log(`user ${data.userId}logged in`);
        const event = await service.userOnline(data.userId)
        console.log(event)
        //sending out data
        event.friends.forEach(id =>{
            socket.to(`user: ${id}`).emit(
                "friend_online",
                data
            )            
        })

        // 
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