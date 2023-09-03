const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    image: {
        type: String,
        default: '/defaults/defaults.png',
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    team: {
        type: mongoose.Types.ObjectId
    },
    private: {
        type: Boolean,
        default: true
    },
    tags: { type: [String], default: [] },
}, {
    timestamps: true
})

const ProjectModel = mongoose.model('project', projectSchema);

module.exports = {
    ProjectModel
}