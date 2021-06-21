const jwt = require('jsonwebtoken');

const AuthJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw { err: "No Auth Header Present on Request!" };
        const token = authHeader.split(' ');
        if (!token[1]) throw { err: "No JWT Token Present on the Header!" };
        const status = jwt.verify(token[1], process.env.JWTSECRET);
        if (!status) throw { err: "Invalid JWT Token!" };
        req.user = status;
    }
    catch (err) {
        return res.json({ code: 401, errCode: 11, message: err.err })
    }
    next();
}

module.exports = AuthJWT

