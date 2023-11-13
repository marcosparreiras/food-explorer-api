const AppError = require('./AppError');

function validateRequestBody(bodyRequestedParams, body) {
    if (!Array.isArray(bodyRequestedParams)) {
        throw new Error('bodyRequestedParams should be an array');
    }
    const missingParams = [];
    bodyRequestedParams.forEach((param) => {
        if (!Object.keys(body).includes(param)) {
            missingParams.push(param);
        }
    });
    if (missingParams.length > 0) {
        const message = `IT'S MISSING: ${missingParams.join(', ')}`;
        throw new AppError(message);
    }
}

module.exports = validateRequestBody;
