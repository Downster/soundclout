const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require("../../db/models");
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    const likes = await db.Likes.findAll({})
    res.json(likes)
}))

router.delete('/:likeId', requireAuth, asyncHandler(async (req, res) => {
    const { likeId } = req.params
    const like = await db.Likes.findByPk(likeId);
    await like.destroy()
    res.json(like)
}))

router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { songId, userId } = req.body;
    const like = await db.Likes.create({
        userId,
        songId
    })
    res.json(like)
}))



module.exports = router