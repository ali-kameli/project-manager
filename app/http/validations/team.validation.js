const { body } = require("express-validator")
const { TeamModel } = require("../../models/team.model")

exports.creatTeamValidator = () => {
    return [
        body('name').notEmpty().withMessage('name must be fill')
            .isLength({ min: 3, max: 30 }).withMessage('team name must between 3 & 30 character'),
        body('description').notEmpty().withMessage('description team must be fill')
            .isLength({ min: 3, max: 30 }).withMessage('team description must between 3 & 30 character'),
        body('username').notEmpty().matches(/^[a-z][a-z0-9_.]{2,}$/i).withMessage("Invalid username format")
            .custom(async (username) => {
                const team = await TeamModel.findOne({ username });
                if (team) throw "username already exist";
                return true
            })

    ]
}