const { ProjectModel } = require("../../models/project.model");

class ProjectController {
    async createProject(req, res, next) {
        try {
            const { title, text, image } = req.body;
            const owner = req.user._id;
            const project = await ProjectModel.create({ title, text, owner, image });
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
    getAllProject() { }
    getProjectByID() { }
    getProjectOfTeam() { }
    getProjectOfUser() { }
    updateProject() { }
    removeProject() { }
};

module.exports = {
    ProjectController: new ProjectController()
}