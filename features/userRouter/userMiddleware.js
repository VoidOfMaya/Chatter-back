import { prisma } from "../../lib/prisma.js"

//providing a dated  single source of truth for user intity based on req.user.id 
const getUserObj = async (id) =>{
    return await prisma.user.findUnique({
        where: {id: id}
    })
}

export{
    getUserObj
}