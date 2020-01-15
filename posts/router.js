const express = require('express');
const database = require('./model');

const router = express.Router();

// create post
router.post('/', (request, response) => {
    if (!request.body.title || !request.body.contents) {
        response.status(400).json({message: 'must include title and contents for post'});
    } else {
        database.insert(body)
            .then(res => response.status(201).json({message: 'post created successfully'}))
            .catch(err => response.status(500).json({message: 'error creating post'}));
    };
});

// create comment
router.post('/:id/comments', (request, response) => {
    database.findById(request.params.id)
        .then(res => {
            if (res.length === 0) {
                response.status(404).json({message: 'post with specified id not found'});
            } else if (!request.body.text) {
                response.status(400).json({message: 'must include text for comment'});
            } else {
                database.insertComment({text: request.body.text, post_id: request.params.id})
                    .then(res => response.status(201).json({message: 'comment created successfully'}))
                    .catch(err => response.status(500).json({message: 'error creating comment'}));
            };
        })
        .catch(err => response.status(500).json({message: 'error fetching post'}));
});

// fetch all posts
router.get('/', (request, response) => {
    database.find()
        .then(res => response.status(200).json({message: 'posts fetched successfully', res}))
        .catch(err => response.status(500).json({message: 'error fetching posts'}));
});

// fetch post
router.get('/:id', (request, response) => {
    database.findById(request.params.id)
        .then(res => {
            if (res.length === 0) {
                response.status(404).json({message: 'post with specified id not found'});
            } else {
                response.status(200).json({message: 'post fetched successfully', post: res[0]});
            };
        })
        .catch(err => response.json(500).json({message: 'error fetching post'}));
});

// fetch post's comments
router.get('/:id/comments', (request, response) => {
    database.findById(request.params.id)
        .then(res => {
            if (res.length === 0) {
                response.status(404).json({message: 'post with specified id not found'});
            } else {
                database.findPostComments(request.params.id)
                    .then(r => response.status(200).json({message: 'comments fetched successfully', comments: r}))
                    .catch(e => response.status(500).json({message: 'error fetching comments'}));
            };
        })
        .catch(err => response.status(500).json({message: 'error fetching post'}));
});

// delete post
router.delete('/:id', (request, response) => {
    database.findById(request.params.id)
        .then(res => {
            if (res.length === 0) {
                response.status(404).json({message: 'post with specified id not found'});
            } else {
                database.remove(request.params.id)
                    .then(r => response.status(200).json({message: 'post deleted successfully'}))
                    .catch(e => response.status(500).json({message: 'error deleting post'}));
            };
        })
        .catch(err => response.status(500).json({message: 'error fetching post'}));
});

// edit post
router.put('/:id', (request, response) => {
    database.findById(request.params.id)
        .then(res => {
            if (res.length === 0    ) {
                response.status(404).json({message: 'post with specified id not found'});
            } else if (!request.body.title || !request.body.contents) {
                response.status(400).json({message: 'must include title and contents for post'});
            } else {
                database.update(request.params.id, body)
                    .then(r => response.status(200).json({message: 'post updated successfully'}))
                    .catch(e => response.status(500).json({message: 'error updating post'}));
            };
        })
        .catch(err => response.status(500).json({message: 'error fetching post'}));
});

module.exports = router;