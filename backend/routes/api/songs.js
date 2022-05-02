const { uploadAudio, uploadImage, deleteAudio } = require('../../utils/awsUpload')
const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require("../../db/models");
const crypto = require('crypto');
const multer = require('multer')
const { memoryStorage } = require('multer')
const { requireAuth } = require('../../utils/auth')
const storage = memoryStorage()
const upload = multer({ storage })
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

router.patch('/:songId', requireAuth, upload.fields([
    { name: 'image', maxCount: 1 },
]), asyncHandler(async (req, res) => {
    const { title, description, caption, private } = req.body
    if (!title) {
        res.status = 400;
        res.json({
            'Title': 'Bad Request',
            'Errors': 'Please input a title'
        })
    }
    const { songId } = req.params
    const song = await db.Song.findByPk(songId, {
        include: [
            { model: db.User },
            { model: db.Album },
            { model: db.Genre }
        ]
    });
    await song.update({
        title,
        description,
        caption,
        private: (private === 'public') ? false : true

    })
    res.json(song)
}))




router.post('/',
    upload.fields([
        { name: 'image', maxCount: 1 }
    ]),
    requireAuth,
    asyncHandler(
        async (req, res) => {
            const { url, title, userId, description, caption, private, awsTitle, genre } = req.body
            if (!title) {
                res.status = 400;
                res.json({
                    'Title': 'Bad Request',
                    'Errors': 'Please input a title'
                })
            }
            let imageName,
                imageFile,
                imageType,
                imageLink;
            //create image name with unique ID to prevent having files with the same name
            if (req.files.image) {
                imageName = crypto.randomUUID() + req.files.image[0].originalname
                imageFile = req.files.image[0].buffer
                imageType = req.files.image[0].mimetype
                imageLink = await uploadImage(imageName, imageType, imageFile)
                console.log(imageLink)
            }

            const song = await db.Song.create({
                userId,
                url,
                awsTitle,
                genreId: genre,
                imageUrl: imageLink,
                title,
                description,
                caption,
                private: (private === 'public') ? false : true
            })
            console.log(song)
            res.json(song)
        }))

module.exports = router

