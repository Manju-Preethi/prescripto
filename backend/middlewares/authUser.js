import jwt from 'jsonwebtoken'

//user authentication middle ware
const authUser=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return res.json({success:false,message:'not authorized login again'})
        }
        
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        req.body = req.body || {};
// req.body.userId = decoded.id;

        req.body.userId=token_decode.id

        next();

    } catch (error) {
        console.log(error)
        res.json({suscess:false,message:error.message})
    }
}


export default authUser;