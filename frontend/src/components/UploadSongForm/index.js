import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSong } from '../../store/songs';

const UploadSongForm = ({ sessionUser }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null)
    const [song, setSong] = useState(null);
    const [description, setDescription] = useState('')
    const [caption, setCaption] = useState('')
    const [privacy, setPrivacy] = useState('public')
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('audiofile', song)
        formData.append('userId', sessionUser.id)
        formData.append('title', title)
        formData.append('image', image)
        formData.append('description', description)
        formData.append('caption', caption)
        formData.append('private', privacy)
        dispatch(createSong(formData))

    };

    const updateFile = (e, type) => {
        const file = e.target.files[0];
        if (type === 'song') {
            setSong(file);
        }
        if (type === 'image') {
            setImage(file)
        }
    };

    return (
        <div className={'upload-song-container'}>
            <form onSubmit={(e, type) => handleSubmit(e)}>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type='file'
                    onChange={(e) => updateFile(e, 'song')}
                />
                <input
                    type='file'
                    onChange={(e) => updateFile(e, 'image')}
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
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

                <button type="submit" className='submit-song'>Upload Song</button>
            </form>
        </div>
    )
}

export default UploadSongForm