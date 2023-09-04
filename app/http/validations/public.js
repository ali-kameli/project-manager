const { param } = require("express-validator")

exports.mongoIdValidator = () => {
    return [
        param("id").isMongoId().withMessage("the ID sended incorrect")
    ]
}