import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    if(!token) return res.status(401).json({message: 'Not authorized'})
    
    jwt.verify(token, process.env.SECRET_KEY, (err, user)=> {
        if(err) return res.status(401).json({message: 'invalid token'});

        req.user = user
        next();
    }) 
}