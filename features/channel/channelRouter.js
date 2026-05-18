import { Router } from "express";
import { controller } from "./channelController.js";
import { validate } from "./channelValidation.js";
import { authorize } from './premissions.js'

const channelRouter = Router({mergeParams: true});
//premissions
//======= AUTHENTICATED CONTROLLER===========
channelRouter.get('/info',controller.getChannelInfo) // postman-tested
channelRouter.post('/new',validate.newChannel,controller.createNewChannel)// postman-tested
channelRouter.post('/joinreq',controller.joinRequest) // postman-tested

//======= MEMBERS CONTROLLER===========
channelRouter.get('/dm' ,authorize.member ,controller.getChannel) // postman-tested
//standalone routes:
channelRouter.get('/' ,authorize.member ,controller.getChannel) // postman-tested
channelRouter.put('/leave',authorize.member,controller.leaveChannel) // postman-tested

//======= MODERATION CONTROLLER===========

channelRouter.get('/mod/joinreq',authorize.mod, controller.getAllJoinRequests)// postman-tested
channelRouter.put('/mod/acceptreq',authorize.mod, controller.acceptRequest)// postman-tested
channelRouter.put('/mod/rejectreq',authorize.mod, controller.rejectRequest)// postman-tested
channelRouter.delete('/mod/removeuser',authorize.mod, controller.removeUser)// postman-tested
channelRouter.post('/mod/newmod',authorize.mod, controller.enableMod)




export{
    channelRouter
}