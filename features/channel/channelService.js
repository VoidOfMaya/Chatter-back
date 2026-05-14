import { prisma } from "../../lib/prisma.js"
/*
stand alone route:-
    [X] createChnl
    [] requestJoinChnl
    [] getAllChnls (user-specific)
    [X] getChnlById (with msgs + members)
    [] leaveChnl

    mod protected:-
    [] enableModPrivByID
    [] addUserToChnl (mod only)
    [] removeUserFromChnl (mod only)

*/
const getChannel = async (id) =>{
    const result = await prisma.channel.findUnique({
        where: {id: id},
        include:{
            members:{
                select:{
                    user:{ select:{
                            id: true,
                            name: true,
                            photo: true
                        }
                    }
                }
            },
            messages: true,
        }
    })
    return result
}
//creates new channel and adds creator with mod privilage to its memberslist
const newChannel = async(creatorId, name)=>{
    return await prisma.channel.create({
        data:{
            name: name,
            type: 'GROUP',
            members:{
                create:{
                    isMember: true,
                    isMod: true,
                    userId: creatorId
                }
            }
        }
    })
}
// mode protected

const service ={
    newChannel,
    getChannel
}
export{
    service
}