import { service } from "./userServices.js"

//gets  friends& channels
const getDashboard = async (req, res)=>{
    try {
        //takes req.user.id to get dashboard
        const data = await service.populateDashboard(req.user.id)
        res.status(200).json(data)
    } catch (err) {
      res.status(500).json({msg: err.message || 'internal server error'})  
    }
    
}
//gets current users profile
const getCurrentUser = async (req, res)=>{
    //takes user id from req.user
    try {
        const currentUser = await service.getcurrentUser(req.user.id)
        res.status(200).json(currentUser)
    } catch (err) {
        res.status(500).json({msg: err.message || 'internal server error'})  
    }
}
// edits and updates current user info
const editCurrentUser = async (req, res)=>{
    try {
        const newProfile = await service.editCurrentUser(req.user.id,req.body)
        res.status(200).json({msg: 'updated successful'})
    } catch (err) {
        res.status(500).json({msg: err.message || 'internal server error'})      
    }
    
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