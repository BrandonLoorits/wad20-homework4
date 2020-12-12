const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const PostModel = require('../models/PostModel');


router.get('/', authorize, (request, response) => {

    // Endpoint to get posts of people that currently logged in user follows or their own posts

    PostModel.getAllForUser(request.currentUser.id, (postIds) => {

        if (postIds.length) {
            PostModel.getByIds(postIds, request.currentUser.id, (posts) => {
                response.status(201).json(posts)
            });
            return;
        }
        response.json([])

    })

});

router.post('/', authorize,  (request, response) => {

    // Endpoint to create a new post

});


router.put('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to like a post

    let UserID = request.currentUser.id
    let PostID = request.params.postId

    try{
        PostModel.like(UserID,PostID, (posts) => {
        response.status(201).json()
    })

    }catch{
        response.status(500)
    }
    
});

router.delete('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to unlike a post

    let UserId = request.currentUser.id
    let PostId = request.params.postId

    try{
        PostModel.unlike(UserId,PostId, (posts) => {
        response.status(200).json()
    })

    }catch{
        response.status(500)
    }
});

module.exports = router;
