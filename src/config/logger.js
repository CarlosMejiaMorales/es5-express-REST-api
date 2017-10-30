const winston    =  require('winston'); // logging
/************************************************/

winston.loggers.add('categoryOne', {
    console: {
        level: 'info',
        colorize: true,
        label: 'Launch'
    },
    file: {
        filename: './logs/categoryOne'
    }
}); // configuring logger

var cat1 = winston.loggers.get('categoryOne');// assigning logger to cat1


module.exports = cat1;