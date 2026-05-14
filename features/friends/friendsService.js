import { prisma } from "../../lib/prisma.js";

//gets friends by id 
const getActiveFriends = async (id) =>{
   const result = await prisma.userFriends.findMany({
    where:{
        OR:[{friendId: id},{userId: id}],
        status: 'ACTIVE'
    },
    select:{
        id: true,
        friend:{
            select:{
                id: true,
                email: true,
                name: true,
                bio: true,
                photo: true,
                lastOnline: true,
                isOnline: true,
                createdAt: true
            }
        }
    }
   })
   return result
}
const getFriendConnectionById = async (id) =>{
   const result = await prisma.userFriends.findUnique({
    where:{id: id},
    select:{
        friend:{
            select:{
                id: true,
                email: true,
                name: true,
                bio: true,
                photo: true,
                lastOnline: true,
                isOnline: true,
                createdAt: true
            }
        }
    }
   })
   return result
}
//creates friend request rakes senderid , revieverId)
const sendFriendRequest = async (senderId, recieverId) =>{
    // insures that the smaller number is always first to prevent duplicates in db
    const normalizeId =(a,b)=>{
        return a < b? [a, b]: [b, a]; //insures the bigger number is always first
    }
    const [userId, friendId] = normalizeId(senderId, recieverId)
    const result = await prisma.userFriends.create({
        data:{        
            userId,    
            friendId
        }
    })
    return result 
}
//gets friend requests(friends request sent to user)
const getPendingFriends = async (id) =>{
    const result = await prisma.userFriends.findMany({
        where: {
            userId : id,
            status: 'PENDING'
        },
        select: {
            id: true,
            friend:{
                select:{
                    id: true,
                    email: true,
                    name: true,
                    photo: true
                }
            }
        }
    })
    return result
}
//accepts friend requests of status pending(takes friendship record id)
const acceptFriendRequest = async (recordId) =>{
    // activates connection
    const result = await prisma.userFriends.update({
        where:{id: recordId},
        data:{
            status: 'ACTIVE'
        }
    })
    //creates a channel per connection
    const channelId = await prisma.channel.create({
        select:{
            id: true
        },
        data:{
            type: 'FRIEND',
            name: 'Direct Messages',
        },
    })
    //joins both users to channel
    await prisma.channelMember.createMany({
        data:[
            {
                channelId: channelId.id,
                userId: result.userId
            },
            {
                channelId: channelId.id,
                userId: result.friendId
            }
        ]
    })
    return {result, channelId}
}
//rejects friends request of status pending(deletes request recoord by id)
const rejectFriendRequest = async (requestId) =>{
    const result = await prisma.userFriends.delete({where:{id: requestId}})
    return result 
}
const endFriendship = async (relationId, channelConnectionId) =>{
    //delete all records with channel id from channelMember table
    await prisma.channelMember.deleteMany({where:{channelId: channelConnectionId}});
    //delete channel with channel id from channel table
    await prisma.channel.delete({where: {id: channelConnectionId}})
    //delete all records with relationId  from userFriends table
    await prisma.userFriends.delete({where: {id: relationId}})

}

//terminates friendship
const service ={
    getActiveFriends,
    getFriendConnectionById,
    sendFriendRequest,
    getPendingFriends,
    acceptFriendRequest,
    rejectFriendRequest,
    endFriendship

}
export{
    service
}