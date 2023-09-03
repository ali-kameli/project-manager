const { body } = require('express-validator');

exports.createProjectValidation = () => {
    return [
        body('title').notEmpty().withMessage('project title must be filled'),
        body('text').notEmpty().withMessage('project description must be filled'),
        body('tags').isArray({ min: 0, max: 10 }).withMessage('maximum tags is 10 word'),
    ]
}