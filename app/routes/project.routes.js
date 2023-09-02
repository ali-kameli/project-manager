const { ProjectController } = require('../http/controllers/project.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');
const { createProjectValidation } = require('../http/validations/project.validation');

const router = require('express').Router();

router.post('/create',checkLogin, createProjectValidation(),expressValidationMapper, ProjectController.createProject)
module.exports = {
    projectRoutes: router
}