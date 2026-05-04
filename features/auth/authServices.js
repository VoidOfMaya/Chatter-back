import {prisma} from '../../lib/prisma.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import 'dotenv/config'
/*
implementing an access and refresh + token rotation on each refresh
 this will have a few componenets!
 1-access token: used to allow user access on a successfull login(short lifespan)
        -token must be stored in memory  to prevent  Xss theft
        -on expiry prompt/check for a valid refresh token
        -is JWT
2-refresh token: generated on  user access(longer lived lifespan)
        - token is stored in httpOnly cookies
        - use inactive lifetime as a limit on  access 
        - is opaque random generated string!
3- detects reused refresh tokens
        -requirs tracking and storage in db
        -on reuse detect remove all tokens  and revoke access(require user log in)
*keynote this approach for auth builds on the simpler token bearer approach!

*/
//A basic register and  login!
//takes {email, password, name}
const register = async (data) =>{
    await prisma.user.create({
        data:{
            email: data.email,
            name: data.name,
            password: await bcrypt.hash(data.password,10) //hashes and encrypts pasword!
        }
    })
}
const login = async (data) =>{
    const {email, password} = data
    const user = await prisma.user.findUnique({
        where: {email: email}
    })
    if(!user) throw new Error("invalid login");

    const match = await bcrypt.compare(password, user.password);
    if(!match) throw new Error("invalid login");
    //access token:-
    const accessToken = createAToken(user);
    // refresh token:-
    const refreshToken = await createRToken(user)
    return{
        user:{
            id: user.id,
            email: user.email,
            name: user.name,
            bio: user.bio,
            photo: user.photo,
            createdAt: user.createdAt,
            lastOnline: user.lastOnline
        },
        accessToken,
        refreshToken
    }
}
const createAToken = (user)=>{
    const accessToken = jwt.sign(
        {id: user.id, email: user.email},
        process.env.APIKEY,
        {expiresIn: '15m'}
    )
    return accessToken
}
// requires user object
const createRToken = async (user)=>{

    const refreshToken = crypto.randomBytes(32).toString('hex');
    const oneWeek = 7 * 24 * 60 * 1000; //one week in milliseconds
    const experationDate = new Date(Date.now() + oneWeek);
    try{
        const getUserTokens = await prisma.refreshToken.findMany({
            where: {
                userId: user.id, 
                revoked: false
            },
            data:{
                revoked:true,
            },
        })
        console.log(getUserTokens)
        /*
        await prisma.refreshToken.create({
            data:{
                token: refreshToken,           
                expiresAt: experationDate,                   
                userId: Number(user.id)
            }
        })
        */
        return refreshToken        
    }catch(err){
        throw new Error({message: err || 'token Generation issue'})
    }

}
const validateRToken = async (tokenString)=>{
    const rToken = await prisma.refreshToken.findUnique({
        where: { token: tokenString }
    });

   
    if (!rToken) return false;

    // If the token is already revoked
    if (rToken.revoked) {
        await prisma.refreshToken.updateMany({
            where: { userId: rToken.userId }, 
            data: { revoked: true }
        });
        throw new Error('Security Breach: Token reuse detected');
    }

    //EXPIRATION CHECK
    const now = new Date();
    if (rToken.expiresAt < now) {
        throw new Error('Token Expired');
    }
    //token is valid, not revoked, and not expired.
    return true 

}
export{
    login,
    register
}