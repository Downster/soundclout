const AWS = require('aws-sdk');

const s3 = new AWS.S3()

const uploadAudio = (fileName, file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: fileName,
            Bucket: 'soundclout',
            Body: file,
            ContentType: 'audio/mpeg',
            ACL: 'public-read'
        }

        s3.upload(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.Location)
            }
        })
    })
}

const uploadImage = (fileName, fileType, file) => {
    return new Promise((resolve, reject) => {
        const params = {
            Key: fileName,
            Bucket: 'soundclout',
            Body: file,
            ContentType: fileType,
            ACL: 'public-read'
        }

        s3.upload(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.Location)
            }
        })
    })
}

const deleteAudio = async (fileName) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: 'soundclout',
            Key: fileName
        }

        s3.deleteObject(params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve('Deleted successfully')
            }
        });
    })

}

module.exports = {
    uploadImage, uploadAudio, deleteAudio
}