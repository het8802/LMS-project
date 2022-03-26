const jwt = require('jsonwebtoken');
const JWT_secret = 'LMSproj';

const authorize = (req, res, next) => {
    try {
        const token = req.header('auth-token');

        if (!token) {
            return res.status(401).json({error: "You are not authorized to access the data"});
        }

        try {
            var data = jwt.verify(token, JWT_secret);
        } catch {
            return res.status(401).json({error: "You are not authorized to access the token data"})
        }

        req.userID = data.id;
        next();
            
    } catch  {
        return res.status(500).json({error: "Unauthorized"});
    }
}

module.exports = authorize;