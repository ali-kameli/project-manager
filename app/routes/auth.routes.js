const { AuthController } = require('../http/controllers/auth.controller');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');
const { registerValidator } = require('../http/validations/auth.validation');

const router = require('express').Router();

router.post('/register', registerValidator(), expressValidationMapper, AuthController.register)


module.exports = {
    authRoutes: router
}