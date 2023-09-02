const { hashPassword, tokenGenerator } = require("../../modules/functions");
const { UserModel } = require('../../models/user.model');
const bcrypt = require('bcryptjs');
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

    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await UserModel.findOne({ username });
            if (!user) return res.status(404).json({ message: 'username or password is wrong !' })
            const compareResult = bcrypt.compareSync(password, user.password);
            if (!compareResult) throw res.status(401).json({ message: 'username or password is wrong !' });
            const token = tokenGenerator({ username });
            user.token = token;
            await user.save();
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'login successfull',
                token
            })
        } catch (error) {
            next(error)
        }
    }
    resetPassword() { }
}

module.exports = {
    AuthController: new AuthController()
}