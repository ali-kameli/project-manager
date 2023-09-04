const autoBind = require("auto-bind");
const { TeamModel } = require("../../models/team.model");
const { UserModel } = require("../../models/user.model");

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
    async findUserInTeam(teamID, userID) {
        const team = await TeamModel.findOne({
            $or: [{ owner: userID }, { users: userID }],
            _id: teamID
        });
        return !!team;
    }
    //? /team/invite/:teamID/:username 
    async inviteUserToTeam(req, res, next) {
        try {
            const userID = req.user._id;
            const { username, teamID } = req.params;
            const team = await this.findUserInTeam(teamID, userID);
            if (!team) throw { status: 400, message: "team for invite not found " };
            const user = await UserModel.findOne({ username });
            if (!user) throw { status: 400, message: "user for invite to team not found " }

            const userInvited = await this.findUserInTeam(teamID, user._id);
            if (userInvited) throw { status: 400, message: "this user has been invited" };
            const request = {
                caller: req.user?.username,
                dateRequest: new Date(),
                teamID,
                status: "pending"
            }
            const updateResult = await UserModel.updateOne({ username }, { $push: { inviteRequest: request } })
            if (updateResult.modifiedCount == 0) throw { status: 500, message: 'invite request has been failed' };
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'invite request was successfully'
            })
        } catch (error) {
            next(error);
        }
    }
    removeTeam() { }
    updateTeam() { }
    removeUserFromTeam() { }
}

module.exports = {
    TeamController: new TeamController()
}