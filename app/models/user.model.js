const mongoose = require('mongoose');

const InviteRequest = new mongoose.Schema({
    teamID: { type: mongoose.Types.ObjectId, required: true },
    caller: { type: String, required: true },
    deteRequest: { type: Date, default: Date.now() },
    status: { type: String, default: "pending" }
})

const userSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: String, required: true, unique: true },
    roles: { type: [String], default: ["User"] },
    password: { type: String, required: true },
    skills: { type: [String], default: [] },
    team: { type: [mongoose.Types.ObjectId], default: [] },
    token: { type: String, default: '' },
    profile_image: { type: String },
    inviteRequest: { type: [InviteRequest] }
}, {
    timestamps: true
})

const UserModel = mongoose.model('user', userSchema);

module.exports = {
    UserModel
}