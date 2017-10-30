const express = require('express');

const Post    = require('../models/post'); // requiring our model for interacting with mongoDB

var posts = express.Router();

// use robomongo as mongoDB extra tool

posts.route('/posts')// .../posts/
    .post(function(req, res, next) {
        Post.create(req.body).then(function(post){ // creating COLLECTION from REQ.BODY, then(return POST) and sending post back; 
            res.send(post);
        }).catch(next);/*.catch(function(err){
            if (err) {
                console.log('another',err.message); // local error handling commented out
            }
        });*/
    })
    .get(function(req, res, next){
        Post.find({}).then(function(posts) {
            res.status(200).send(posts);
        }).catch(function(err) {
            res.status(402).send(err.message);
        });
    });
posts.route('/posts/:id')// .../posts/{_id}
    .delete(function(req, res, next) {
        //req.params.id for accessing uri parameter
        Post.findByIdAndRemove({_id: req.params.id}/*setting mongo _id to our params's id*/).then(function(post) {
            res.status(200).send(post);
        }).catch(function(err) {
            res.status(402).send(err.message);
        })
    })
    .put(function(req, res, next) {
        Post.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(post) { // updating document
            Post.findOne({_id: req.params.id}).then(function(post) { // getting updated document otherwise would get old document
               res.status(200).send(post);
            }).catch(function(err) {
               res.status(402).send(err.message); 
            });
        }).catch(function(err) {
            res.status(402).send(err.message);
        });
    });

module.exports = posts