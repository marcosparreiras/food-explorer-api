require('express-async-errors');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const openDataBase = require('./database/sqlite');
const { UPLOADS_FOLDER } = require('./config/upload');

openDataBase();
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(UPLOADS_FOLDER));

app.use((error, _req, res, _next) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }
    console.log(error);
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.use((_req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listen on port: ${PORT}`);
});
