import { Router } from "express";
import { uploadFile } from "./photoController.js";
import { multerMiddleware } from "./photoMiddleWare.js";

const photoRouter = Router();

photoRouter.post('/file',multerMiddleware,uploadFile);

export{
    photoRouter
}