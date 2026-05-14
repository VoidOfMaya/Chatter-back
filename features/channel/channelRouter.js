import { Router } from "express";
import { controller } from "./channelController.js";
import { validate } from "./channelValidation.js";

const channelRouter = Router({mergeParams: true});
//standalone rout
channelRouter.post('/new',validate.newChannel,controller.createNewChannel)

//mod only rout

//nested rout
channelRouter.get('/',controller.getDmChannel)


export{
    channelRouter
}