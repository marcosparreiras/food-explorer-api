const path = require('path');
const multer = require('multer');

const TEMP_FOLDER = path.resolve(__dirname, '..', '..', 'temp');
const UPLOADS_FOLDER = path.resolve(TEMP_FOLDER, 'uploads');

const multerConfig = {
    storage: multer.diskStorage({
        destination: TEMP_FOLDER,
        filename(_req, file, cb) {
            const uniquePrefix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            return cb(null, uniquePrefix + '-' + file.originalname);
        },
    }),
};

module.exports = {
    TEMP_FOLDER,
    UPLOADS_FOLDER,
    multerConfig,
};
