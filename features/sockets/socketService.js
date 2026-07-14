import { prisma } from "../../lib/prisma.js";

const userOnline = async (id) =>{
    // set user to online
    const status = await prisma.user.update({
        where: {id : Number(id)},
        data:{isOnline: true}
    })
    // get list of known friend ids
    const result =await prisma.user.findUnique({
        where:{id: Number(id)},
        select: {            
            friendSent:{
                where:{status: 'ACTIVE'},
                select:{
                    friend:{
                        select:{
                            id: true
                        }
                    }
                }
            },
            friendsRecieved:{
                where:{status: 'ACTIVE'},
                select:{
                    user:{
                        select:{
                            id: true
                        }
                    }
                }
            }
        }
    })
    const sanitizedFriendData = () =>{
        let array =[];
        result.friendSent.forEach(connection =>{
            const friend = connection.friend;
            array.push(friend.id)
        })
        result.friendsRecieved.forEach(connection =>{
            const friend = connection.user
            //checks for friendship duplication!
            const exists = array.some(connection => connection.id === friend.id);
            if(!exists){
                array.push(friend.id)
            }
        })

        return array
    }
    const friendIdArray =sanitizedFriendData()
    const outboundData ={
        data:{
            id: status.id, 
            name: status.name, 
            isOnline: status.isOnline
        },
        friends:friendIdArray.filter((id, index, current)=> current.indexOf(id)=== index),
    }
    return outboundData
}
const service ={
    userOnline,
}
export{ 
    service
}