const { body } = require("express-validator");
const { UserModel } = require("../../models/user.model");

function registerValidator() {
    return [
        body("username")
            .notEmpty().withMessage("Username cannot be empty")
            .isLength({ min: 3, max: 25 }).withMessage("Username must be between 4 and 25 characters")
            .matches(/^[a-z][a-z0-9_.]{2,}$/i).withMessage("Invalid username format")
            .custom(async (username) => {
                if (username) {
                    const user = await UserModel.findOne({ username });
                    if (user) throw 'username already exsit !'
                    return true
                }
            }),
        body("email")
            .notEmpty().withMessage("Email cannot be empty")
            .isEmail().withMessage("Invalid email address")
            .custom(async (email) => {
                if (email) {
                    const user = await UserModel.findOne({ email })
                    if (user) throw 'email already exsit !'
                }
            }),
        body("mobile")
            .notEmpty().withMessage("Mobile number cannot be empty")
            .isMobilePhone("fa-IR").withMessage("Invalid mobile number")
            .custom(async (mobile) => {
                const user = await UserModel.findOne({ mobile });
                if (user) throw 'mobile already exsit !'
            }),
        body("password")
            .notEmpty().withMessage("Password cannot be empty")
            .isLength({ min: 6, max: 16 }).withMessage("Password must be between 6 and 16 characters")
            .custom((value, { req }) => {
                if (value !== req.body.confirm_password) {
                    throw new Error("Password and confirm password do not match");
                }
                return true;
            })
    ];
}
function loginValidation() {
    return [
        body('username').notEmpty().withMessage('username must be filled')
            .matches(/^[a-z][a-z0-9_.]{2,}$/i).withMessage("Invalid username format")
            .custom(async (username) => {
                const user = await UserModel.findOne({ username });
                if (!user) throw 'username or password is wrong !';
                return true
            }),
        body('password').isLength({ min: 6, max: 16 }).withMessage('password must between 6 & 16 characters')
    ]
}
module.exports = {
    registerValidator,
    loginValidation
};