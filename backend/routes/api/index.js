// backend/routes/api/index.js
const express = require('express');
const router = express.Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js')
const commentsRouter = require('./comments.js')
const likesRouter = require('./likes.js');
const genresRouter = require('./genres.js');
const searchRouter = require('./search.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter);
router.use('/comments', commentsRouter)
router.use('/likes', likesRouter)
router.use('/genres', genresRouter)
router.use('/search', searchRouter)


module.exports = router;