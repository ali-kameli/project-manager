const fileUpload = require('express-fileupload');
const { createUploadPath } = require('./functions')

const path = require('path');

exports.uploadFile = (req, res, next) => {
    try {
        if (req.file || Object.keys(req.files).length == 0) throw { status: 400, message: 'choose a picture for project' };
        let image = req.files.image;
        const image_path = path.join(createUploadPath(), (Date.now() + path.extname(image.name)))
        req.body.image = image_path.substring(7);
        let uploadPath = path.join(__dirname, "..", "..", image_path);
        image.mv(uploadPath, (err) => {
            if (err) throw { status: 500, message: "upload picture has been failed" }
            next()
        })
    } catch (error) {
        next(error)
    }
}