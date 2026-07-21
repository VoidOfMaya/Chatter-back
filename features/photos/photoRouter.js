import { Router } from "express";
import { uploadFile,msgPhoto } from "./photoController.js";
import { multerMiddleware } from "./photoMiddleWare.js";

const photoRouter = Router();

photoRouter.post('/file',multerMiddleware,uploadFile);
photoRouter.post('/msg',multerMiddleware,uploadFile);

export{
    photoRouter
}