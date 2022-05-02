const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require("../../db/models");
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    const genres = await db.Genre.findAll({})
    res.json(genres)
}))



module.exports = router

