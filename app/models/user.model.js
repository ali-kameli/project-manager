const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
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
        type: [String],
        default: ["User"]
    },
    password: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        default: []
    },
    team: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    token: {
        type: String,
        default: '',
    },
}, {
    timestamps: true
})

const UserModel = mongoose.model('user', userSchema);

module.exports = {
    UserModel
}