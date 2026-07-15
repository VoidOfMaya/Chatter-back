import { service } from "./socketService.js"; 
//controller
const setOnlineStatus =(socket, io) =>{
    socket.on('friend_online',async ()=>{

        console.log(`user ${socket.user.id}is live`);
        const event = await service.userOnline(socket.user.id)
        console.log(event)
        //sending out data
        event.friends.forEach(id =>{
            console.log(`sending packet to user ${id}`)
            io.to(`user:${id}`).emit(
                "friend_online",
                event.data
            )            
        })
    })
    //console.log(`user ${data.userId}loggerd in`)
}
export{
    setOnlineStatus
}