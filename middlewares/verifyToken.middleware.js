const jwt = require('jsonwebtoken')
exports.verifyToken = (req, res, next) => {

    var token = req.headers["x-access-token"] || req.headers['authorization'];
    if (!token) {
        return res.status(413).send({ 'forbidden': "A token is required for authentication" });
    }
    if (req.headers['authorization']) {
        token = token.replace(/^Bearer\s+/, "");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY || '123');
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({ 'UnAuthorized': "Invalid Token" });
    }
    return next();
}