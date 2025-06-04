import jwt from 'jsonwebtoken'
import {Types} from 'mongoose'

const authMiddleware = (req, res, next)=>{
  const token = req.headers.authorization?.split(' ')[1]
  if(!token){
    return res.status(401).json({message: "Unauthorized"})
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if(!Types.ObjectId.isValid(decoded.id)){
        return res.status(401),json({message: "Unauthorized: Invalid user"})

    }
    
    req.user = {id: decoded.id}

    next()
  } catch(error){
    return res.status(401).json({message: "Unauthorized"})
  }
}

export default authMiddleware