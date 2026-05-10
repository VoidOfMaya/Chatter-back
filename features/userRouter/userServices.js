import { prisma } from "../../lib/prisma.js"

const populateDashboard = async (userId) =>{
    const result = await prisma.user.findUnique({
        where:{id: userId},
        include: {            
            channels:{
                include:{channel: true}
            },
            friendSent:{
                where:{status: 'ACTIVE'},
                include:{friend: true}
            },
            friendsRecieved:{
                where:{status: 'ACTIVE'},
                include:{
                    user: true
                }
            }
        }
    })
    //requires data normalization
    return result
}

const service = {
    populateDashboard
}
export{service}