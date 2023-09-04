const autoBind = require("auto-bind");
const { TeamModel } = require("../../models/team.model");

class TeamController {
    constructor() {
        autoBind(this);
    }
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
    async findTeam(teamID) {
        const team = await TeamModel.findById(teamID);
        if (!team) throw { status: 404, message: "team not found" };
        return team;
    }
    async getTeamById(req, res, next) {
        try {
            const teamID = req.params.id;
            const team = await this.findTeam(teamID);
            return res.status(200).json({
                status: 200,
                success: true,
                team
            })
        } catch (error) {
            next(error)
        }
    }
    async getMyTeams(req, res, next) {
        try {
            const userID = req.user._id;
            const teams = await TeamModel.find({
                $or: [
                    { owner: userID },
                    { users: userID }
                ]
            });
            res.status(200).json({
                status: 200,
                success: true,
                teams
            })
        } catch (error) {
            next(error)
        }
    }
    async removeTeamById(req, res, next) {
        try {
            const teamID = req.params.id;
            const owner = req.user._id;
            await this.findTeam(teamID);
            const result = await TeamModel.deleteOne({ _id: teamID, owner });
            
            if (result.deletedCount == 0) throw { status: 500, message: "delete team has been failed" }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "delete projectc successfully"
            })
        } catch (error) {
            next(error)
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