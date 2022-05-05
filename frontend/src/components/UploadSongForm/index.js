import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSong } from '../../store/songs';
import { v4 as uuidv4 } from 'uuid';
import genreNameToNum from "../../utils/genreNameToNum";
import AWS from 'aws-sdk'
import './uploadSong.css'

const UploadSongForm = ({ sessionUser }) => {
    const s3 = new AWS.S3()
    s3.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    })
    const hiddenSongInput = useRef(null)
    const hiddenSongInput2 = useRef(null)
    const history = useHistory()
    const dispatch = useDispatch();
    const [isUploaded, setIsUploaded] = useState(false)
    const [title, setTitle] = useState('')
    const [songName, setSongName] = useState('')
    const [songUrl, setSongUrl] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0);
    const [song, setSong] = useState(null);
    const [awsTitle, setAwsTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [description, setDescription] = useState('')
    const [caption, setCaption] = useState('')
    const [privacy, setPrivacy] = useState('public')
    const [genre, setGenre] = useState('None')
    const genres = useSelector(state => state.genres)
    const [errors, setErrors] = useState([])


    const handleSubmit = async (e) => {

        e.preventDefault();
        const formData = new FormData()
        formData.append('url', songUrl)
        formData.append('awsTitle', awsTitle)
        formData.append('userId', sessionUser.id)
        formData.append('title', title)
        formData.append('artist', artist)
        formData.append('genre', genreNameToNum(genre))
        formData.append('image', image)
        formData.append('description', description)
        formData.append('caption', caption)
        formData.append('private', privacy)
        const error = await dispatch(createSong(formData))
        if (error) {
            setErrors(error.errors)
        } else {
            history.push('/discover')
        }
    };

    const updateFile = async (e, type) => {
        const file = e.target.files[0];
        setSongName(file.name)
        if (!isUploaded) {
            setIsUploaded(!isUploaded)
        }
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
    const showSongInput = event => {
        hiddenSongInput.current.click();
    };

    const showSongInput2 = event => {
        hiddenSongInput2.current.click();
    };


    return (
        <div className="outside-container-upload">
            {!isUploaded &&
                <div className="upload-first-song">
                    <div className="upload-song-container">
                        <div className='upload-song first'>
                            <button className='upload-song-button' onClick={showSongInput}>Choose a file to Upload</button>
                            <div className="file-upload">
                                <h1>{songName}</h1>
                                <input className="song-upload"
                                    type='file'
                                    ref={hiddenSongInput}
                                    onChange={(e) => updateFile(e, 'song')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isUploaded &&
                <>

                    <div className="replace-upload">
                        <h1>Provide FLAC, WAV, ALAC, or AIFF for highest audio quality. Learn more about lossless HD.</h1>
                        <button onClick={showSongInput2}>Replace File</button>
                    </div>
                    <div className="file-upload show">
                        <h1>{songName}</h1>
                        <input className="song-upload"
                            type='file'
                            ref={hiddenSongInput2}
                            onChange={(e) => updateFile(e, 'song')}
                        />
                    </div>
                    <div className="progress-bar">
                        <progress value={progress} max='100'></progress>
                    </div>
                    <div className="upload-song-container second">
                        <div className='upload-song'>
                            <div className="upload-song-header">
                                <h1>Basic Info</h1>


                            </div>
                            <div className="image-form-container">
                                <div className="image-edit">

                                    <img className='song-image-upload' src='' />
                                    <input className="upload-image"
                                        type='file'
                                        onChange={(e) => updateFile(e, 'image')}
                                        placeholder="Upload image"
                                    />
                                </div>

                                <div className='edit-song-form'>
                                    <div className="errors">
                                        {errors && errors.map((error, idx) => {
                                            return <h1 key={idx}> {error}</h1>
                                        })}
                                    </div>
                                    <label>Title*</label>
                                    <input
                                        type='text'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <label>Artist*</label>
                                    <input
                                        type='text'
                                        value={artist}
                                        onChange={(e) => setArtist(e.target.value)}
                                    />

                                    <label>Genre</label>
                                    <select
                                        onChange={({ target: { value } }) => setGenre(value)}
                                        value={genre}
                                    >
                                        {Object.values(genres).map((genre) => (
                                            <option
                                                key={genre.id}
                                                value={genre.name}
                                            >
                                                {genre.name}
                                            </option>
                                        ))}
                                    </select>
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
                    </div>
                </>
            }
        </div >

    )
}

export default UploadSongForm