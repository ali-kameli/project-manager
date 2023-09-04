const autoBind = require("auto-bind");
const { ProjectModel } = require("../../models/project.model");
const { createLinkForFiles } = require("../../modules/functions");

class ProjectController {
    constructor() {
        autoBind(this);
    }
    async createProject(req, res, next) {
        try {
            const { title, text, image, tags } = req.body;
            const owner = req.user._id;
            console.log(tags);
            const project = await ProjectModel.create({ title, text, owner, image, tags });
            if (!project) throw { staus: 400, message: "create project has been failed" };
            return res.status(201).json({
                status: 201,
                success: true,
                message: "create project successfully"
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projects = await ProjectModel.find({ owner });
            for (const project of projects) {
                project.image = createLinkForFiles(project.image, req);
            }
            if (!projects) throw { status: 404, message: 'project not found' };
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'project found',
                projects
            })

        } catch (error) {
            next(error)
        }
    }
    async findProject(projectID, owner) {
        const project = await ProjectModel.findOne({ owner, _id: projectID });
        if (!project) throw { status: 404, message: "project not found " };
        return project;
    }
    async getProjectByID(req, res, next) {
        try {
            const projectID = req.params.id;
            const owner = req.user._id;
            const project = await this.findProject(projectID, owner);
            project.image = createLinkForFiles(project.image, req);
            return res.status(200).json({
                status: 200,
                success: true,
                project
            })
        } catch (error) {
            next(error);
        }
    }
    async removeProject(req, res, next) {
        try {
            const projectID = req.params.id;
            const owner = req.user._id;
            const project = await this.findProject(projectID, owner);
            const deleteProjectResult = await ProjectModel.deleteOne({ _id: projectID });
            if (deleteProjectResult.deletedCount == 0) throw { status: 400, message: "delete project has been failed" }
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'project has been deleted'
            })
        } catch (error) {
            next(error);
        }
    }
    async updateProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            const project = await this.findProject(projectID, owner);
            const data = { ...req.body };
            Object.entries(data).forEach(([key, value]) => {
                if (!['title', 'text', 'tags'].includes(key)) delete data[key];
                if (["", " ", 0, -1, undefined, null, NaN].includes(value)) delete data[key];
                if (key == "tags" && (data['tags'].constructor === Array)) {
                    data["tags"] = data["tags"].filter(val => {
                        if (!["", " ", 0, -1, undefined, null, NaN].includes(val)) return val;
                    })
                }
            })
            const updateResult = await ProjectModel.updateOne({ _id: projectID }, { $set: data })
            if (updateResult.modifiedCount == 0) throw { status: 400, message: 'update project has been failed' }
            return res.status(200).json({
                status: 200,
                success: true,
                message: "update successfull"
            })
        } catch (error) {
            next(error)
        }
    }
    async updateProjectImage(req, res, next) {
        try {
            const { image } = req.body;
            const owner = req.user._id;
            const projectID = req.params.id;
            await this.findProject(projectID, owner);
            const updateResult = await ProjectModel.updateOne({ _id: projectID }, { $set: { image } });
            if (updateResult.modifiedCount == 0) throw { status: 400, message: 'upload project image has been failed' };
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'update project image successfully'
            })
        } catch (error) {
            next(error)
        }
    }
    getProjectOfTeam() { }
    getProjectOfUser() { }
};

module.exports = {
    ProjectController: new ProjectController()
}