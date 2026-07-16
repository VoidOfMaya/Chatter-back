import { service } from "./socketService.js"; 
//controller
const setOnlineStatus =(socket, io) =>{
    socket.on('user_connected',async ()=>{

        console.log(`user ${socket.user.id}is live`);
        const event = await service.userOnline(socket.user.id,true)
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

    socket.on('disconnect',async(reason)=>{
        console.log(`socket disconnected: ${reason}`)
        const room = io.sockets.adapter.rooms.get(`user:${socket.user.id}`)
        if(!room || room.size === 0){
            const event = await service.userOnline(socket.user.id,false)

            event.friends.forEach(id =>{
                console.log(`sending packet to user ${id}`)
                io.to(`user:${id}`).emit(
                    "friend_offline",
                    event.data
                )            
            })
    }

  })
    //console.log(`user ${data.userId}loggerd in`)
}

export{
    setOnlineStatus
}