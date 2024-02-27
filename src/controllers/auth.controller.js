const AuthService = require('../services/auth.service');
const service = new AuthService();

const login = async ( req, res ) => {
    try { 
        const token = await service.login(req.body);
        res.header('auth-token', token).json({ 
            success: true, 
            data: {token} 
        });
    } catch (error) {
        res.status(500).send({ success: false, message: error });
    }
}

module.exports = {
    login
};