const { hashPassword } = require("../../modules/functions");
const { UserModel } = require('../../models/user.model');
class AuthController {
    async register(req, res, next) {
        const { username, password, email, mobile } = req.body;
        const hash_password = hashPassword(password);
        const user = await UserModel.create({
            username,
            email,
            mobile,
            password: hash_password
        })
        return res.json(user)
    }

    login() { }
    resetPassword() { }
}

module.exports = {
    AuthController: new AuthController()
}