import { Router } from "express";
import { controller } from "./userController.js";

const userRouter = Router();

/*
[] getUserById
[] editUser
[] blockUser =>belongs to friends resource

 [] enableModPriv
*/
//gets current users  dashboard
userRouter.get('/me', controller.getDashboard)
//gets current users profile
userRouter.get('/me/profile', controller.getCurrentUser)
// edits and updates current user info
userRouter.put('/me/profile',controller.editCurrentUser)
//gets other user profile by id!
userRouter.get('/:userId/profile',controller.viewUserProfile)
//blockes user {if friends: true}
userRouter.put('/:userId/profile/block',controller.blockUser) 

export{
    userRouter
}