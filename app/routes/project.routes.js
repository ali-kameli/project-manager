const fileUpload = require('express-fileupload');
const { ProjectController } = require('../http/controllers/project.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');
const { createProjectValidation } = require('../http/validations/project.validation');
const { uploadFile } = require('../modules/expressFileUpload');

const router = require('express').Router();

router.post('/create', fileUpload(), checkLogin, uploadFile, createProjectValidation(), expressValidationMapper, ProjectController.createProject)
router.get('/list', checkLogin, ProjectController.getAllProject);
router.get('/:id', checkLogin, ProjectController.getProjectByID);
router.delete('/remove/:id', checkLogin, ProjectController.removeProject);
router.put('/edit/:id', checkLogin, ProjectController.updateProject);

module.exports = {
    projectRoutes: router
}