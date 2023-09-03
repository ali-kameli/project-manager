const { ProjectModel } = require("../../models/project.model");

class ProjectController {
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
    getProjectByID() { }
    getProjectOfTeam() { }
    getProjectOfUser() { }
    updateProject() { }
    removeProject() { }
};

module.exports = {
    ProjectController: new ProjectController()
}