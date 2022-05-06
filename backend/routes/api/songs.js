const { uploadAudio, uploadImage, deleteAudio } = require('../../utils/awsUpload')
const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require("../../db/models");
const { memoryStorage } = require('multer')
const { requireAuth } = require('../../utils/auth')
const storage = memoryStorage()
const router = express.Router();


router.get('/', asyncHandler(async (req, res) => {
    const songs = await db.Song.findAll({
        include: [
            { model: db.User },
            { model: db.Genre }
        ]

    })
    res.json(songs);

}))

router.delete('/:songId', requireAuth, asyncHandler(async (req, res) => {
    const { songId } = req.params
    const song = await db.Song.findByPk(songId);
    await deleteAudio(song.awsTitle)
    song.destroy();
    res.json({
        'Message': 'Deleted Successfully'
    })

}))

router.patch('/:songId', requireAuth, asyncHandler(async (req, res, next) => {
    const { title, artist, description, caption, imageUrl, private, genreId } = req.body
    const { songId } = req.params
    if (!title || !artist) {
        const errors = []
        const error = new Error('Invalid input')
        if (!artist) {
            errors.push('Please provide an artist')
        }
        if (!title) {
            errors.push('Please provide a title')
        }
        error.title = "Invalid input";
        error.errors = errors
        error.status = 400;
        next(error)
    } else {
        const song = await db.Song.findByPk(songId);
        await song.update({
            title,
            imageUrl,
            artist,
            genreId,
            description,
            caption,
            private: (private === 'public') ? false : true

        })
        const updatedSong = await db.Song.findByPk(songId, {
            include: [
                { model: db.User },
                { model: db.Genre }
            ]
        });
        res.json(updatedSong)
    }
}))




router.post('/',
    requireAuth,
    asyncHandler(
        async (req, res, next) => {
            const { url, title, userId, imageUrl, description, caption, private, awsTitle, genre, artist } = req.body
            if (!title || !artist) {
                const errors = []
                const error = new Error('Invalid input')
                if (!artist) {
                    errors.push('Please provide an artist')
                }
                if (!title) {
                    errors.push('Please provide a title')
                }
                error.title = "Invalid input";
                error.errors = errors
                error.status = 400;
                next(error)
            } else {
                // let imageName,
                //     imageFile,
                //     imageType,
                //     imageLink;
                // //create image name with unique ID to prevent having files with the same name
                // if (req.files.image) {
                //     imageName = crypto.randomUUID() + req.files.image[0].originalname
                //     imageFile = req.files.image[0].buffer
                //     imageType = req.files.image[0].mimetype
                //     imageLink = await uploadImage(imageName, imageType, imageFile)
                //     console.log(imageLink)
                // }

                const song = await db.Song.create({
                    userId,
                    url,
                    awsTitle,
                    genreId: genre,
                    imageUrl,
                    title,
                    artist,
                    description,
                    caption,
                    private: (private === 'public') ? false : true
                })
                res.json(song)
            }
        }))

module.exports = router

