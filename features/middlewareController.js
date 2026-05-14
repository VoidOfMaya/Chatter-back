import { passportConfig, isAuthenticated } from "./auth/authMiddleware.js";
import { getUserObj } from "./userRouter/userMiddleware.js";

const midware ={
    passportConfig,
    isAuthenticated,
    getUserObj
    
}
export{
    midware
}