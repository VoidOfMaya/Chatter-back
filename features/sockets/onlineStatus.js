import { service } from "./socketService.js"; 
//controller
const setOnlineStatus =(socket, io) =>{
    socket.on('user_connected',async ()=>{


        const event = await service.userOnline(socket.user.id,true)
        //sending out data
        event.friends.forEach(id =>{
            io.to(`user:${id}`).emit(
                "friend_online",
                event.data
            )             
        })
    })

    socket.on('disconnect',async(reason)=>{
        console.log(`socket disconnected: ${reason}`)
        const room = io.sockets.adapter.rooms.get(`user:${socket.user.id}`)
        if(!room || room.size === 0){
            const event = await service.userOnline(socket.user.id,false)

            event.friends.forEach(id =>{
                io.to(`user:${id}`).emit(
                    "friend_offline",
                    event.data
                )            
            })
        
        }
    })

}

export{
    setOnlineStatus
}