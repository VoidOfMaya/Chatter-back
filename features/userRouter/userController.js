import { service } from "./userServices.js"

//gets  friends& channels
const getDashboard = async (req, res)=>{
    try {
        //takes req.user.id to get dashboard
        const data = await service.populateDashboard(1)
        res.status(200).json(data)
    } catch (err) {
      res.status(500).json({msg: err || 'internal server error'})  
    }
    
}
//gets current users profile
const getCurrentUser = async (req, res)=>{
    res.status(200).json({msg: 'user profile data'})
}
// edits and updates current user info
const editCurrentUser = async (req, res)=>{
    res.status(200).json({msg: 'Edit user profile data'})
}
//gets other user profile by id!
const viewUserProfile = async (req, res)=>{
    res.status(200).json({msg: 'get other users data'})
}
//blockes user {if friends: true}
const blockUser = async (req, res)=>{
    res.status(200).json({msg: 'block user if friend'})
}

const controller ={
    getDashboard,
    getCurrentUser,
    editCurrentUser,
    viewUserProfile,
    blockUser
}
export{controller}