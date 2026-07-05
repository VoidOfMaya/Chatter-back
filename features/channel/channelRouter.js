import { Router } from "express";
import { controller } from "./channelController.js";
import { validate } from "./channelValidation.js";
import { authorize } from './premissions.js'
import { messsageRouter } from "../messages/messageRouter.js";

const channelRouter = Router({mergeParams: true});
//premissions
//======= AUTHENTICATED CONTROLLER===========
channelRouter.get('/info',validate.channel,controller.getChannelInfo) // postman-tested
channelRouter.post('/new',validate.newChannel,controller.createNewChannel)// postman-tested
channelRouter.post('/joinreq',validate.channel,controller.joinRequest) // postman-tested

//======= MEMBERS CONTROLLER===========
//standalone routes:
channelRouter.get('/' ,validate.channel ,authorize.member ,controller.getChannel) // postman-tested
channelRouter.delete('/leave' ,validate.relation,validate.channel ,authorize.member ,controller.leaveChannel) // postman-tested

//======= MODERATION CONTROLLER===========

channelRouter.get('/mod/joinreq',validate.channel,authorize.mod ,controller.getAllJoinRequests)// postman-tested
channelRouter.get('/mod/modstat',validate.channel,authorize.mod ,controller.checkModStat)
channelRouter.put('/mod/acceptreq',validate.relation ,validate.channel ,authorize.mod ,controller.acceptRequest)// postman-tested
channelRouter.delete('/mod/rejectreq',validate.relation,validate.channel ,authorize.mod ,controller.rejectRequest)// postman-tested
channelRouter.delete('/mod/removeuser',validate.relation ,validate.channel ,authorize.mod ,controller.removeUser)// postman-tested
channelRouter.post('/mod/newmod',validate.relation ,validate.channel ,authorize.mod ,controller.enableMod)// postman-tested

//====== NESTED MESSAGE ROUTER==========
// member level authorization
channelRouter.use('/msgs',validate.channel ,authorize.member , messsageRouter);
//mod


export{
    channelRouter
}