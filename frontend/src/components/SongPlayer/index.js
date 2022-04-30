import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useRef } from "react";
import { setSeek } from "../../store/songPlay";
import './SongPlayer.css'
import MiniSongCard from "./MiniSongCard";

const SongPlayer = () => {
    const currentSong = useSelector(state => state.currentSong);
    const [position, setPosition] = useState(0)
    const intervalRef = useRef(null)
    const dispatch = useDispatch()

    const formatTime = (time) => {
        let min = Math.floor(time / 60);

        let sec = Math.floor(time % 60);
        if (sec < 10) {
            sec = `0` + sec;
        }

        return `${min}:${sec}`;
    }

    const updateWidth = () => {
        setPosition((currentSong.song.seek() / currentSong.song.duration()) * 100);
    }


    if (currentSong.isPaused) {
        clearInterval(intervalRef.current);
        intervalRef.current = null
    }


    if (!intervalRef.current && currentSong.isPlaying) {
        intervalRef.current = setInterval(() => {
            updateWidth();
        }, 300);
    }

    const onScrub = (value) => {
        clearInterval(intervalRef.current);
        //dispatch new seek to store
        dispatch(setSeek(value))
        setPosition(value);
        intervalRef.current = setInterval(() => {
            updateWidth();
        }, 300);
    }
    return (
        <div className="sound-bar">
            <img className='soundbar-button' src={require('./images/svgexport-5.png')} />
            <img className='soundbar-button' src={require('./images/Playcurrent.png')} />
            <img className='soundbar-button' src={require('./images/svgexport-6.png')} />
            <img className='soundbar-button' src={require('./images/Shuffle.png')} />
            <img className='soundbar-button' src={require('./images/Repeat.png')} />
            <div className="time-passed">
                <p className="current-time">{(currentSong.song?.seek()) ? formatTime(currentSong.song.seek()) : '0:00'}</p>
            </div>
            <input className='track-bar'
                type='range'
                min='0'
                step='1'
                value={position}
                max={currentSong.duration}
                onChange={(e) => onScrub(e.target.value)}
            />
            <div className="duration-text">
                <p className="duration">{formatTime(currentSong.duration)}</p>
            </div>
            <img src={require('./images/svgexport-7.png')} />
            <MiniSongCard currentSongId={currentSong.songId} />
            <img src={require('./images/svgexport-9.png')} />

        </div>
    )
}

export default SongPlayer