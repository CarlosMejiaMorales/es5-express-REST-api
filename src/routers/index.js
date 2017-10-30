const express = require('express');

var index =  express.Router();

index.route('/home') //.../home/
    .get(function(req, res, next) {
        res.json({
            message: "welcome home"
        })
    });
module.exports = index;

