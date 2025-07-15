const winston = require ('winston');

const logger = winston.createLogger({
    level: 'info',
    format:winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports:[
        new winston.transports.File({filename: 'Logs/error.log', level: 'error'}),
        new winston.transports.File({filename:'logs/combined.log'}),
        new winston.transports.Console(),
    ],
});

module.exports = logger;