import { service } from "./socketService.js"; 

const channelEventHandler =(socket, io) =>{
    socket.on(`view_channel`, async(data)=>{
        console.log(`viewing channel: ${data.id}`)
        //join channel room
        socket.join(`channel_room${data.id}`)
        //listen for typing
    })
    socket.on(`typing_to`,async(data)=>{
        socket.to(`channel_room${data.id}`).emit(
            'is_typing',{
                userId: socket.user.id,
                name: socket.user.name
            }
        )
    })
    socket.on('stop_typing',async(data)=>{
        socket.to(`channel_room${data.id}`).emit(
            'not_typing',{
                userId: socket.user.id,
                name: socket.user.name
            }
        ) 
    })
}
export{
    channelEventHandler
}