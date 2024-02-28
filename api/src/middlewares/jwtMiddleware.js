require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;
const tokenDuration = process.env.JWT_EXPIRES_IN;
const tokenAlgorithm = process.env.JWT_ALGORITHM;

module.exports.generateToken = (req, res, next) => {
    const payload = {
        memberId: res.locals.memberId,
        timestamp: new Date()
    };

    const options = {
        algorithm: tokenAlgorithm,
        expiresIn: tokenDuration,
    };

    const callback = (err, token) => {
        if (err) {
            console.error("Error jwt:", err);
            res.status(500).json(err);
        } else {
            res.locals.token = token;
            next();
        }
    };

    const token = jwt.sign(payload, secretKey, options, callback);
};

module.exports.sendToken = (req, res, next) => {
    res.cookie('authToken', res.locals.token, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 604800000 });

    res.status(200).json({
        message: res.locals.message
    });
};

module.exports.verifyToken = (req, res, next) => {    
    const token = req.cookies.authToken;
  
    if (!token || token === undefined) {
        return res.status(401).json({
            error: 'No token provided. Please register an account or login.'
        });
    }
  
    const callback = (err, decoded) => {
        if (err) {
            res.clearCookie('authToken');
            return res.status(401).json({
                error: "Invalid token. Please login again."
            });
        }
    
        res.locals.memberId = decoded.memberId;
        res.locals.tokenTimestamp = decoded.timestamp;
    
        next();
    };
  
    jwt.verify(token, secretKey, callback);
};