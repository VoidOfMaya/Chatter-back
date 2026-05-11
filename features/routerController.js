import {authRouter} from './auth/authRouter.js'
import { friendRouter } from './friends/friendsRouter.js'
import {indexRouter} from './index/indexRouter.js'
import { userRouter } from './userRouter/userRouter.js'

const pipe = {
    authRouter,
    indexRouter,
    userRouter,
    friendRouter
}
export{
    pipe
}