const router = require('express').Router();
const { TeamController } = require('../http/controllers/team.controller');
const { checkLogin } = require('../http/middlewares/autoLogin');
const { creatTeamValidator } = require('../http/validations/team.validation');
const { expressValidationMapper } = require('../http/middlewares/checkErrors');
const { mongoIdValidator } = require('../http/validations/public');

router.post('/create', checkLogin, creatTeamValidator(), expressValidationMapper, TeamController.createTeam)
router.get('/list', checkLogin, TeamController.getListsOfTeam);
router.get('/me', checkLogin, TeamController.getMyTeams);
router.get('/:id', checkLogin, mongoIdValidator(), TeamController.getTeamById);
router.delete('/remove/:id', checkLogin, mongoIdValidator(), expressValidationMapper, TeamController.removeTeamById)

module.exports = {
    teamRoutes: router
}