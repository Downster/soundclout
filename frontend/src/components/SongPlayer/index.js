import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useRef } from "react";
import { setSeek } from "../../store/songPlay";
import './SongPlayer.css'

const SongPlayer = ({ hasSong }) => {
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

        return `${min} : ${sec}`;
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
            <img src={require('./images/svgexport-5.png')} />
            <img src={require('./images/Playcurrent.png')} />
            <img src={require('./images/svgexport-6.png')} />
            <img src={require('./images/Shuffle.png')} />
            <img src={require('./images/Repeat.png')} />
            <p className="current-time hide">{(currentSong.song?.seek()) ? formatTime(currentSong.song.seek()) : '0 : 00'}</p>
            <input className='track-bar'
                type='range'
                min='0'
                step='1'
                value={position}
                max={currentSong.duration}
                onChange={(e) => onScrub(e.target.value)}
            />
            <p className="duration hide">{formatTime(currentSong.duration)}</p>
            <img src={require('./images/svgexport-7.png')} />
            <p>Mini song card here</p>
            <img src={require('./images/svgexport-9.png')} />

        </div>
    )
}

export default SongPlayer