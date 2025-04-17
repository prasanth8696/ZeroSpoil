const jwt = require("jsonwebtoken")


const verifyToken = (req,res,next) => {

    let token;
    token = req.headers.authorization || req.headers.Authorization

    if(token && token.startsWith("Bearer")){
        try{
            token = token.split(" ")[1]

            if(! token){
                res.status(401)
                return res.json({message: "Invalid Token, access denied"})
            }
            decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
            req.user = decodeToken.user
            next()
        }catch(err){

            res.status(401)
            return res.json({message: "Invalid Token, access denied"})
        }
        
    }else{
        res.status(400)
            return res.json({message: "Invalid Token, access denied"})
    }
}

module.exports = verifyToken