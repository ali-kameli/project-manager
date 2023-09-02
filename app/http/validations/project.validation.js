const { body } = require('express-validator');

exports.createProjectValidation = () => {
    return [
        body('title').notEmpty().withMessage('project title must be filled'),
        body('text').notEmpty().withMessage('project description must be filled')
        ,
    ]
}