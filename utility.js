var cron = require('node-cron'); // node library for scheduling jobs
const fsextra = require('fs-extra');
const cat1  = require('./src/config/logger');

var setDist = cron.schedule('*/1 * * * *', function(){
    fsextra.copy('./frontend/front/dist', './public').then(function(){
        var currentDate = new Date();
        cat1.info('dist folder has been refreshed at '+ currentDate);
    }).catch(function(err) {
        cat1.info(err);
    });
});
setDist.start()

