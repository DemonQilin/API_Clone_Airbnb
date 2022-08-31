import multer from "multer";
import path from "path";
import { v4 as uuid4 } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            cb(null, path.resolve('uploads'));
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        try {
            cb(null, `${uuid4()}.${file.originalname}`)
        } catch (error) {
            cb(error);
        }
    }
});

export default multer({ storage });