import { Router } from "express";
import { controller } from "./channelController.js";
import { validate } from "./channelValidation.js";
import { authorize } from './premissions.js'

const channelRouter = Router({mergeParams: true});
//premissions
//======= AUTHENTICATED CONTROLLER===========
channelRouter.get('/info',controller.getChannelInfo)
channelRouter.post('/new',validate.newChannel,controller.createNewChannel)
channelRouter.post('/joinreq',controller.joinRequest)

//======= MEMBERS CONTROLLER===========
channelRouter.get('/' ,authorize.member ,controller.getDmChannel)
channelRouter.put('/leave',authorize.member,controller.leaveChannel)

//======= MODERATION CONTROLLER===========

channelRouter.get('/mod/joinreq',authorize.mod, controller.getAllJoinRequests)
channelRouter.get('/mod/acceptreq',authorize.mod, controller.acceptRequest)
channelRouter.get('/mod/rejectreq',authorize.mod, controller.rejectRequest)
channelRouter.get('/mod/removeuser',authorize.mod, controller.removeUser)
channelRouter.delete('/mod/newmod',authorize.mod, controller.enableMod)




export{
    channelRouter
}