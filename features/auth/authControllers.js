import { validationResult, matchedData } from "express-validator";
import {service} from "./authServices.js";

const newUser = async (req, res) =>{
    //validation handler
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);
    //logic
    try{
        await service.register(data)
    }catch(err){
        return res.status(500).json({error: err.message || 'Internal Server Error'})
    }
    res.status(201).json({message:'User  registered successfully'})
}
const login = async (req, res)=>{
    //validation handler
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);
    //logic
    try{
        const result = await service.login(data);
        //pushes threadID and refreshToken to cookies as an httpOnly
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });

        res.cookie('threadId', result.threadId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        res.status(200).json({user: result.user, accessToken: result.accessToken});
    }catch(err){
        res.status(500).json({error: err.message || 'Internal Server Error'})  
    }
}
// accepts Refresh token string,if valid derives user by token string
const token = async (req, res)=>{
    //if refresh token valid  create new access token & refresh token
    //if refresh token invalid return error
    console.log('authenticate user controller')
    try{
        //validating that cookies exist
        const oldToken = req.cookies.refreshToken
        const threadId = req.cookies.threadId
        console.log('refresh rout controller')
        if(!oldToken|| !threadId){
            return res.status(401).json({
                code: 'Missing Credentials',
            })
        }

        //validate token in db
       const refreshToken = await service.validateRToken(oldToken)
        // create new refreshToken
        console.log('Issuing new tokens')
        const newRToken = await service.createRToken(refreshToken.userId,threadId,oldToken)
        //create new accessToken
        const newAToken = await service.createAToken(refreshToken.userId )
        const user = await service.getUserById(refreshToken.userId)
        //updates cookies
        // overwrite cookies automatically
        console.log('renewing cookies')
        res.cookie(
            'refreshToken',newRToken,{
                httpOnly: true,
                secure:process.env.NODE_ENV ==='production',
                sameSite: 'lax',
                maxAge:1000 *60 *60 *24 *7,
            }
        );
        res.cookie(
            'threadId',threadId,{
                httpOnly: true,
                secure:process.env.NODE_ENV ==='production',
                sameSite: 'lax',
                maxAge:1000 *60 *60 *24 *7,
            }
        );
        //returns user and new access token
        console.log('shipping fresh user data')
        return res.status(201).json({
            user:{
                id: user.id,
                email: user.email,
                name: user.name,
                bio: user.bio,
                photo: user.photo,
                lastOnline: user.lastOnline,
                isOnline: user.isOnline,
                createdAt: user.createdAt
            } ,
            accessToken: newAToken, 
        })
    }catch(err){
        console.log(err)
        res.status(err.status).json({code: err.code || 'Internall server Error'})
    }
}
//requires a token thread uuid
const logout = async (req, res) =>{
    try{
        const threadId = req.cookies.threadId;
        const result = await service.removeTokenThread(threadId);
        console.log('refreshtoken family deleted')
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
        });
        res.clearCookie('threadId', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
        });
        console.log('cookies cleared!')
        res.status(200).json(result)
    }catch(err){
        res.status(500).json({error: err.message || 'Internal Server Error'})
    }
}
const controller ={
    newUser,
    login,
    token,
    logout
}
export{
    controller
}