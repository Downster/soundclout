import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit } from '../../store/songs';
import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid';
import genreNameToNum from "../../utils/genreNameToNum";

const EditSongModal = ({ sessionUser, setShowEdit }) => {
    const s3 = new AWS.S3()
    s3.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    })
    const selectedSong = useSelector(state => state.selectedSong)
    const dispatch = useDispatch();
    const [title, setTitle] = useState(selectedSong.song.title)
    const [image, setImage] = useState(selectedSong.song.imageUrl)
    const [artist, setArtist] = useState(selectedSong.song.artist)
    const [description, setDescription] = useState(selectedSong.song.description)
    const [caption, setCaption] = useState(selectedSong.song.caption)
    const [privacy, setPrivacy] = useState((selectedSong.song.private === true) ? 'private' : 'public')
    const [errors, setErrors] = useState([])
    const [genre, setGenre] = useState('None')
    const genres = useSelector(state => state.genres)
    const songId = selectedSong.song.id


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {
            title,
            description,
            caption,
            genre: genreNameToNum(genre),
            imageUrl: image,
            private: privacy,
            artist
        }
        const errors = await dispatch(edit(songId, formData))
        if (errors) {
            setErrors(errors.errors)
        } else {
            setShowEdit(false)
        }
    };

    const updateFile = async (e) => {
        const file = e.target.files[0];
        const fileName = uuidv4() + file.name
        uploadImage(fileName, file)
        setTimeout(() => {
            setImage(`http://${process.env.REACT_APP_S3_BUCKET}.s3.amazonaws.com/${fileName}`)
        }, 3000)
    };

    const uploadImage = (fileName, file) => {
        const params = {
            Key: fileName,
            Bucket: 'soundclout',
            Body: file,
            ContentType: file.type,
            ACL: 'public-read'
        }

        s3.putObject(params)
            .send((err) => {
                if (err) console.log(err)
            })
    }


    const closeModal = () => {
        setShowEdit(false)
    }

    return (
        <div className="modal">
            <button className="modal-close" onClick={closeModal}><i class="fa-solid fa-xmark"></i></button>

            <div className='modal-container'>
                <div className="edit-song-header">
                    <h1>Basic Info</h1>


                </div>
                <div className="image-form-container">
                    <div className="image-edit">
                        <img className='song-image-edit' src={image} />
                        <input className="upload-image"
                            type='file'
                            onChange={(e) => updateFile(e)}
                        />
                    </div>

                    <div className='edit-song-form'>
                        <div className="errors">
                            {errors && errors.map((error, idx) => {
                                return <h1 key={idx}> {error}</h1>
                            })}
                        </div>
                        <label>Title</label>
                        <input
                            required
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label>Artist</label>
                        <input
                            required
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
    )
}

export default EditSongModal