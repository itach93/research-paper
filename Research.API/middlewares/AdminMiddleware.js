const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = await jwt.verify(token, jwtConfig.secret);
        if (decoded.role_id === 2 ) {
            req.user = decoded;
            next();
        } else {
            throw new Error('You are not administrator');
        }
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            message: error.message,
            meta: null,
            data: null
        });
    }
}