const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require("../../db/models");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {

    console.log('here')
    const songs = await db.Song.findAll({})
    const users = await db.User.findAll({})
    res.json({
        users,
        songs
    })
}))



module.exports = router