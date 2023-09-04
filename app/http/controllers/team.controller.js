const { TeamModel } = require("../../models/team.model");

class TeamController {
    async createTeam(req, res, next) {
        try {
            const { name, username, description } = req.body;
            const owner = req.user._id;
            const team = await TeamModel.create({ name, username, description, owner });
            if (!team) throw { status: 500, message: "create team has been failed" };
            return res.status(201).json({
                status: 201,
                success: true,
                message: 'create team successfully',
                team
            })
        } catch (error) {
            next(error);
        }
    }
    async getListsOfTeam(req, res, next) {
        try {
            const teams = await TeamModel.find();
            return res.status(200).json({
                success: true,
                status: 200,
                teams
            })
        } catch (error) {
            next(error);
        }
    }
    inviteUserToTeam() { }
    removeTeam() { }
    updateTeam() { }
    removeUserFromTeam() { }
}

module.exports = {
    TeamController: new TeamController()
}