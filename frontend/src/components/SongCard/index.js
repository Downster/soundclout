import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { receivePlaySong, pauseSong, clearSong, setDuration } from "../../store/songPlay"
import { Howl } from 'howler'
import { Link } from 'react-router-dom'
import './songCard.css'


const SongCard = ({ song, all }) => {
    const dispatch = useDispatch()
    const isPlaying = useSelector(state => state.currentSong.isPlaying)
    // const isPaused = useSelector(state => state.currentSong.isPaused)
    const [showPlay, setShowPlay] = useState(false)
    const [showPause, setShowPause] = useState(false)

    const playSong = (song) => {
        setShowPlay(false)
        setShowPause(true)
        const sound = new Howl({
            src: song.url,
            html5: true,
            onend: function () {
                dispatch(clearSong())
            },
            onload: function () {
                dispatch(setDuration(sound._duration))
            }

        });
        dispatch(receivePlaySong(sound, song.id))
    }

    const pause = () => {
        setShowPlay(false)
        setShowPause(false)
        dispatch(pauseSong())
    }


    return (
        <div key={song.id} className={(showPlay) ? `song-container blur` : 'song-container'} >
            <img alt='pause-button' className={(showPause) ? `pause-song-button` : `pause-song-button hidden`}
                src={require('./images/pause-button.png')}
                onClick={() => pause()} />
            <p className={'song-text'}>{song.title}</p>
            <p className={'song-text'}>{song.artist}</p>
            <Link id={`song-link-${song.id}`} to={`/songs/${song.id}`} onMouseOver={() => (isPlaying) ? setShowPlay(false) : setShowPlay(true)} onMouseLeave={() => setShowPlay(false)}>
                <img alt='song' className={`song-image ${song.id}`} src={song.imageUrl} />
            </Link>
            <img className={(showPlay) ? `play-song-button` : `play-song-button hidden`}
                alt='pause-button'
                onMouseOver={() => setShowPlay(true)}
                src={require('./images/play-button.png')}
                onClick={() => playSong(song)} />

        </div >
    )
}

export default SongCard