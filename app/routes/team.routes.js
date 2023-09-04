const router = require('express').Router();
const { TeamController } = require('../http/controllers/team.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { creatTeamValidator } = require('../http/validations/team.validation');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');

router.post('/create', checkLogin, creatTeamValidator(), expressValidationMapper, TeamController.createTeam)
router.get('/list', checkLogin, TeamController.getListsOfTeam);
router.get('/:id', checkLogin, TeamController.getTeamById)

module.exports = {
    teamRoutes: router
}