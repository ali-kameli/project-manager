const { UserModel } = require("../../models/user.model");
const { createLinkForFiles } = require("../../modules/functions");

class userController {
    getProfile(req, res, next) {
        try {
            const user = req.user;
            user.profile_image = createLinkForFiles(user.profile_image, req);
            return res.status(200).json({
                status: 200,
                success: true,
                user
            })
        } catch (error) {
            next(error)
        }
    }
    async editProfile(req, res, next) {
        try {
            let data = { ...req.body };
            const userID = req.user._id;
            let fields = ['first_name', 'last_name', 'skills'];
            let badValues = ['', ' ', 0, -1, null, undefined, NaN];

            Object.entries(data).forEach(([key, value]) => {
                if (!fields.includes(key)) delete data[key];
                if (!badValues.includes(value)) delete data[key];
            })
            const result = await UserModel.updateOne({ _id: userID }, { $set: data });
            if (result.modifiedCount > 0) {
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: 'profile successfully updated'
                })
            } throw { status: 400, message: 'error for update profile ' }
        } catch (error) {
            next()
        }
    }
    async uploadProfileImage(req, res, next) {
        try {
            const userID = req.user._id;
            if (Object.keys(req.file).length == 0) throw { status: 400, message: 'please choose a picture' }
            const filePath = req.file?.path.substring(7);
            const result = await UserModel.updateOne({ _id: userID }, { $set: { profile_image: filePath } });
            if (result.modifiedCount == 0) throw { status: 400, message: 'update failed' };
            return res.status(200).json({
                status: 200,
                message: 'update successfull',
                success: true
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllRequests(req, res, next) {
        try {
            const userID = req.user._id;
            const { inviteRequest } = await UserModel.findById(userID, { inviteRequest: 1 })?.inviteRequest || [];
            return res.json({
                requests: inviteRequest || []
            })
        } catch (error) {
            next(error)
        }
    }
    async getRequestsByStatus(req, res, next) {
        try {
            const { status } = req.params;
            const userID = req.user._id;
            const requests = await UserModel.aggregate([
                { $match: { _id: userID } },
                {
                    $project: {
                        inviteRequest: 1,
                        _id: 0,
                        inviteRequest: {
                            $filter: {
                                input: "$inviteRequest",
                                as: "request",
                                cond: {
                                    $eq: ["$$request.status", "pending"]
                                }
                            }
                        }
                    }
                }
            ])
            return res.status(200).json({
                status: 200,
                success: true,
                requests
            })
        } catch (error) {
            next(error)
        }
    }
    addSkills() { }
    editSkills() { }
    acceptInviteInTeam() { }
    rejectInviteInTeam() { }
}

module.exports = {
    userController: new userController()
}