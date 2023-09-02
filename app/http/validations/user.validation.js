const { body } = require("express-validator")
const path = require('path');

exports.imageValidation = () => {
    return [
        body("image").custom((image, { req }) => {
            if (Object.keys(req.file).length == 0) throw 'please choose a picture';
            const ext = path.extname(req.file.originalname);
            const exts = ['.jpeg', '.png', '.jpg', '.webp'];
            if (!exts.includes(ext)) throw 'format not correct, correct format  [.jpeg, .png, .jpg, .webp]';
            const maxSize = 5 * 1024 * 1024;
            if (req.file.size > maxSize) throw 'file size is longer';
            return true;
        })
    ]
}