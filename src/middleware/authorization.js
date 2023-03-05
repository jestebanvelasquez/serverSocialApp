import Jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if( !token) return res.status(400).json({error:'not authorizathion validate'});

        if( token.startsWith('Bearer ')) {
            token = token.slice(7, token.length)// quitamos la palabra bearer del token 
        }

        const verifyToken = Jwt.verify(token, process.env.JWT_SECRET)
        req.user = verifyToken;
        next()
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

