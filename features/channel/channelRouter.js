import { Router } from "express";
import { controller } from "./channelController.js";

const channelRouter = Router({mergeParams: true});
//standalone channels
channelRouter.get('/',controller.getDmChannel)
//nested channels



export{
    channelRouter
}