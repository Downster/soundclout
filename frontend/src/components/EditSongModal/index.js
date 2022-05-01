import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSong, edit } from '../../store/songs';

const EditSongModal = ({ sessionUser, setShowEdit }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null)
    const [song, setSong] = useState(null);
    const [description, setDescription] = useState('')
    const [caption, setCaption] = useState('')
    const [privacy, setPrivacy] = useState('public')
    const selectedSong = useSelector(state => state.selectedSong)
    const songId = selectedSong.song.id


    const handleSubmit = (e) => {
        const formData = new FormData()
        formData.append('audiofile', song)
        formData.append('title', title)
        formData.append('image', image)
        formData.append('description', description)
        formData.append('caption', caption)
        formData.append('private', privacy)
        dispatch(edit(songId, formData))
        setShowEdit(false)
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        setImage(file)
    };

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

                        <img className='song-image-edit' src={(selectedSong.song.imageUrl) ? selectedSong.song.imageUrl : 'https://imgur.cm/hdrdJxY.jpgg'} />
                        <input className="upload-image"
                            type='file'
                            onChange={(e) => updateFile(e)}
                        />
                    </div>

                    <div className='edit-song-form'>
                        <label>Title</label>
                        <input
                            type='text'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
        </div>
    )
}

export default EditSongModal