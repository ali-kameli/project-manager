const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    roles: {
        type: String,
        required: true,
        default: ["User"]
    },
    password: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
        default: []
    },
    team: {
        type: String,
        required: true,
        default: []
    },
}, {
    timestamps: true
})

const UserModel = mongoose.model('user', userSchema);

module.exports = {
    UserModel
}