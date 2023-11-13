const path = require('path');
const fs = require('fs');
const { TEMP_FOLDER, UPLOADS_FOLDER } = require('../config/upload');

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename(
            path.resolve(TEMP_FOLDER, file),
            path.resolve(UPLOADS_FOLDER, file)
        );
        return file;
    }

    async deleteFile(file) {
        const filePath = path.resolve(UPLOADS_FOLDER, file);
        try {
            await fs.promises.stat(filePath);
        } catch (_error) {
            return;
        }
        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage;
