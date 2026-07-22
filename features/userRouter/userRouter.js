import { Router } from "express";
import { controller } from "./userController.js";
import {validate} from '../../validations/indexValidation.js'
import {multerMiddleware} from '../photos/photoMiddleWare.js'

const userRouter = Router({mergeParams: true});
//=======[CURRENT USER TO CURRENT USER ]==========
//gets current users  dashboard
userRouter.get('/me', controller.getDashboard)
//gets current users profile
userRouter.get('/me/profile', controller.getCurrentUser)
// edits and updates current user info
userRouter.put('/me/profile',multerMiddleware,validate.userEdit,controller.editCurrentUser)

//=======[CURRENT USER TO OTHER USER]==========
//gets other user profile by id!
userRouter.get('/:id',validate.userId,controller.viewUserProfile)
//blockes user {if friends: true}


export{
    userRouter
}