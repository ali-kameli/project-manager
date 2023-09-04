const fileUpload = require('express-fileupload');
const { ProjectController } = require('../http/controllers/project.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');
const { createProjectValidation } = require('../http/validations/project.validation');
const { uploadFile } = require('../modules/expressFileUpload');
const { mongoIdValidator } = require('../http/validations/public');

const router = require('express').Router();

router.post('/create', fileUpload(), checkLogin, uploadFile, createProjectValidation(), expressValidationMapper, ProjectController.createProject)
router.get('/list', checkLogin, ProjectController.getAllProject);
router.get('/:id', checkLogin, mongoIdValidator(), expressValidationMapper, ProjectController.getProjectByID);
router.delete('/:id', checkLogin, mongoIdValidator(), expressValidationMapper, ProjectController.removeProject);
router.put('/:id', checkLogin, mongoIdValidator(), expressValidationMapper, ProjectController.updateProject);
router.patch('/edit-projectImage/:id', fileUpload(), checkLogin, uploadFile, mongoIdValidator(), expressValidationMapper, ProjectController.updateProjectImage);

module.exports = {
    projectRoutes: router
}