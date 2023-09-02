const fs = require('fs');
const path = require('path');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
exports.tokenGenerator = (payload) => {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1 days" });
    return token
}
exports.verifyJWTToken = (token) => {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if (!result?.username) throw {
        status: 401,
        success: false,
        message: "Authorization Error, please login your account"
    }
    return result;
}
exports.createUploadPath = () => {
    let d = new Date();
    const year = "" + d.getFullYear();
    const month = d.getMonth() + "";
    const day = "" + d.getDate();
    const uploadPath = path.join(__dirname, "..", "..", "public", "upload", year, month, day);
    fs.mkdirSync(uploadPath, { recursive: true });
    return path.join("public", "upload", year, month, day);
}