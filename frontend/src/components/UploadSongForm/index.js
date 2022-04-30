import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSong } from '../../store/songs';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk'
import './uploadSong.css'

const UploadSongForm = ({ sessionUser }) => {
    const s3 = new AWS.S3()
    s3.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    })


    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [songUrl, setSongUrl] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0);
    const [song, setSong] = useState(null);
    const [awsTitle, setAwsTitle] = useState('')
    const [description, setDescription] = useState('')
    const [caption, setCaption] = useState('')
    const [privacy, setPrivacy] = useState('public')
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('url', songUrl)
        formData.append('awsTitle', awsTitle)
        formData.append('userId', sessionUser.id)
        formData.append('title', title)
        formData.append('image', image)
        formData.append('description', description)
        formData.append('caption', caption)
        formData.append('private', privacy)
        dispatch(createSong(formData))
    };

    const updateFile = async (e, type) => {
        const file = e.target.files[0];
        const fileName = uuidv4() + file.name
        if (type === 'song') {
            setSong(file);
            uploadAudio(fileName, file)
            setSongUrl(`https://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com/${fileName}`)
            setAwsTitle(fileName)
        }
        if (type === 'image') {
            setImage(file)
        }
    };

    const uploadAudio = (fileName, file) => {
        const params = {
            Key: fileName,
            Bucket: 'soundclout',
            Body: file,
            ContentType: 'audio/mpeg',
            ACL: 'public-read'
        }

        s3.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


    return (
        <div className='upload-song-container'>
            <div>Native SDK File Upload Progress is {progress}%</div>
            <div className="upload-song-header">
                <h1>Basic Info</h1>


            </div>
            <div className="image-form-container">
                <div className="image-edit">

                    <img className='song-image-upload' src='' />
                    <input className="upload-image"
                        type='file'
                        onChange={(e) => updateFile(e, 'image')}
                    />
                </div>

                <div className='edit-song-form'>
                    <label>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type='file'
                        onChange={(e) => updateFile(e, 'song')}
                    />
                    <label>Genre</label>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>Caption</label>
                    <textarea
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                    <label>Privacy:</label>
                    <label>

                        <input
                            type='radio'
                            value='yes'
                            name='privacy'
                            checked={privacy === 'public'}
                            onChange={() => setPrivacy('public')}
                        />
                        Public
                    </label>
                    <label>
                        <input
                            type='radio'
                            value='no'
                            name='privacy'
                            checked={privacy === 'private'}
                            onChange={() => setPrivacy('private')}
                        />
                        Private
                    </label>
                    <button className='submit-song' onClick={(e) => handleSubmit(e)}>Upload Song</button>
                </div>
            </div>
        </div>
    )
}

export default UploadSongForm