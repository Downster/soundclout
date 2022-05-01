const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require("../../db/models"); const router = express.Router();
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateComment = [
    check('body')
        .exists({ checkFalsy: true })
        .isLength({ min: 3 })
        .withMessage('Please enter a valid comment.'),
    handleValidationErrors
];


router.get('/:songId', asyncHandler(async (req, res) => {

    const { songId } = req.params
    console.log(songId)
    const comments = await db.Comment.findAll({
        where: {
            songId
        },
        include: [
            { model: db.User },
        ]

    })
    res.json(comments);
}))

router.post('/', requireAuth, validateComment, asyncHandler(async (req, res) => {
    const { userId, songId, body, time } = req.body
    const comment = await db.Comment.create({
        userId,
        songId,
        body,
        time
    })
    res.json(comment);
}))




module.exports = router