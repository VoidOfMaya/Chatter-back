import { prisma } from "../../lib/prisma"
/*
stand alone route:-
    [] createChnl
    [] requestJoinChnl
    [] getAllChnls (user-specific)
    [] getChnlById (with msgs + members)
    [] leaveChnl

    mod protected:-
    [] enableModPrivByID
    [] addUserToChnl (mod only)
    [] removeUserFromChnl (mod only)


nested friend route:-
    [] createDmChnl (2 users only)

*/
const getDmChannel = async (id) =>{
    const result = await prisma.channel.findUnique({
        where: {id: id}
    })
}