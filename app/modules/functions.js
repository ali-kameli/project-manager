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