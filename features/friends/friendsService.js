import { prisma } from "../../lib/prisma.js";
/*
[]Friend services:- 
    [] getFrndsByUserId (accepted only)
    [] getFrndRequests (pending)
    []createFrndRequest
    []acceptFrndRequest
    []rejectFrndRequest
    []removeFrnd
*/
//gets friends by id 
const getActiveFriends = async (id) =>{
   const result = await prisma.userFriends.findMany({
    where:{
        OR:[{friendId: id},{userId: id}],
        status: 'ACTIVE'
    },
    select:{
        user:{
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
//creates friend request (takes user id, and new friend id)
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
    const result = await prisma.userFriends.update({
        where:{id: recordId},
        data:{
            status: 'ACTIVE'
        }
    })
    return result
}
//rejects friends request of status pending(deletes request recoord by id)
//terminates friendship
const service ={
    getActiveFriends,
    getPendingFriends,
    acceptFriendRequest
}
export{
    service
}