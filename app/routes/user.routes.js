const { userController } = require('../http/controllers/user.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { imageValidation } = require('../http/validations/user.validation');
const { uploadMulter } = require('../modules/multer');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');

const router = require('express').Router();

router.get('/profile', checkLogin, userController.getProfile);
router.post('/profile', checkLogin, userController.editProfile);
router.post('/profile-image',
    uploadMulter.single("image"),
    imageValidation(), expressValidationMapper, checkLogin,
    userController.uploadProfileImage);
router.get('/requests', checkLogin, userController.getAllRequests)
router.get('/requests/:status', checkLogin, userController.getRequestsByStatus)

module.exports = {
    userRoutes: router
}  