import multer from "multer";
import path from "path";
import { v4 as uuid4 } from 'uuid';
import { errorHandlerHttp } from "./error.handler.js";

const genStorage = dir => multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            cb(null, path.resolve(`uploads/${dir}`))
        } catch (error) {
            cb(error)
        }
    },
    filename: (req, file, cb) => {
        try {
            cb(null, uuid4() + '.' + file.originalname)
        } catch (error) {
            cb(error)
        }
    }
});

const multerProfile = multer({
    storage: genStorage('images/users/profile'),
    fileFilter: (req, file, cb) => {
        try {
            const ext = path.extname(file.originalname).slice(1);
            if (ext !== 'png' && ext !== 'jpg' && ext !== 'gif' && ext !== 'jpeg') {
                return cb(new Error('Only images are allowed'))
            }
            cb(null, true)
        } catch (error) {
            cb(error)
        }
    }
});

export const uploadProfile = (req, res, next) => {
    multerProfile.single('profile_img')(req, res, err => {
        if (err instanceof multer.MulterError) {
            let message = err.message;

            if (err.message === 'Unexpected field') message = `The field '${err.field}' not recognized`;

            errorHandlerHttp(res, { message, status: 400 });
        } else if (err) {
            errorHandlerHttp(res, { message: err.message, status: 400 });
        } else {
            next()
        };
    });
};