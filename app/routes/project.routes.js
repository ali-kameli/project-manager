const fileUpload = require('express-fileupload');
const { ProjectController } = require('../http/controllers/project.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');
const { createProjectValidation } = require('../http/validations/project.validation');
const { uploadFile } = require('../modules/expressFileUpload');

const router = require('express').Router();

router.post('/create', fileUpload(), checkLogin, uploadFile, createProjectValidation(), expressValidationMapper, ProjectController.createProject)
module.exports = {
    projectRoutes: router
}