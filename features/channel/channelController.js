const getDmChannel = async (req, res) =>{
    try {
        const {connectionId} = req.params
        res.status(200).json({msg: 'Dm channel router is live'})
    } catch (err) {
        res.status(200).json({error: err.message || 'Internal Server Error'})
    }
}

const controller = {
    getDmChannel
}

export{
    controller
}