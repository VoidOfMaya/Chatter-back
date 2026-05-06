import{Router} from 'express';
import { validateLogin,validateNewAccount } from '../../validations/indexValidation.js';
import {newUserController, loginController, tokenController, logoutController} from './authControllers.js'
const authRouter = Router()
authRouter.post('/register', validateNewAccount, newUserController);
authRouter.post('/login', validateLogin, loginController)
//logout revokes token on backend, delets  access token from frontend
authRouter.post('/logout',logoutController)
// renew tokens
authRouter.post('/refresh',tokenController)


export{
    authRouter
}