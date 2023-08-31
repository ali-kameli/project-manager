const { UserModel } = require("../../models/user.model");
const { verifyJWTToken } = require("../../modules/functions");

exports.checkLogin = async (req, res, next) => {
    try {
        const authError = {
            status: 401,
            success: false,
            message: "Authorization Error, please login your account"
        }
        const authorization = req?.headers?.authorization;
        if (!authorization) throw authError;
        const token = authorization.split(' ')?.[1];
        if (!token) throw authError;
        const result = verifyJWTToken(token);
        const { username } = result;
        const user = await UserModel.findOne({ username }, { password: 0 })
        if (!user) throw authError;
        req.user = user;
        return next()
    } catch (error) {
        next(error)
    }
}