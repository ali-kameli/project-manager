const authRoutes = require('./auth.routes');
const projectRoutes = require('./project.routes');
const teamRoutes = require('./team.routes');
const userRoutes = require('./user.routes');

const router = require('express').Router();

router.use('/project', projectRoutes);
router.use('/team', teamRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = {
    AllRoutes: router
}