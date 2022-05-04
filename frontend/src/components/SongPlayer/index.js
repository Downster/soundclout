import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState, useRef } from "react";
import { resumeSong, setSeek, pauseSong, restartSong, setRepeat } from "../../store/songPlay";
import './SongPlayer.css'
import MiniSongCard from "./MiniSongCard";
import { formatTime } from "../../utils/formatTime";

const SongPlayer = ({ hasSong }) => {
    const currentSong = useSelector(state => state.currentSong);
    const [position, setPosition] = useState(0)
    const intervalRef = useRef(null)
    const dispatch = useDispatch()


    //check to see if the song has ended so the interval can be cleared and reset
    if (Math.floor(position) === Math.floor(currentSong.duration)) {
        clearInterval(intervalRef.current);
        intervalRef.current = null
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
    const restart = () => {
        dispatch(restartSong())
    }

    const playSong = () => {
        dispatch(resumeSong())
    }

    const pauseCurrentSong = () => {
        dispatch(pauseSong())
    }

    const updateWidth = () => {
        setPosition((currentSong.song.seek()));
    }

    const repeat = () => {
        dispatch(setRepeat())
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
        <>
            {hasSong &&
                <div className="sound-bar">
                    <img className='soundbar-button'
                        onClick={restart}
                        src={require('./images/svgexport-5.png')}
                        alt='Restart'
                    />
                    <img className='soundbar-button'
                        onClick={(currentSong.isPlaying) ? pauseCurrentSong : playSong}
                        src={(currentSong.isPlaying) ? require('./images/Pause-current.png') : require('./images/Playcurrent.png')}
                        alt={(currentSong.isPlaying) ? 'Pause song' : 'Play song'}
                    />

                    {/* <img className='soundbar-button'
                src={require('./images/svgexport-6.png')} /> */}
                    {/* <img className='soundbar-button'
                src={require('./images/Shuffle.png')} /> */}
                    <img className='soundbar-button'
                        onClick={repeat}
                        src={(currentSong.repeat) ? require('./images/Repeat-1.png') : require('./images/Repeat.png')}
                        alt={(currentSong.repeat) ? 'Repeat' : 'Enable Repeat'}
                    />
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
                    {/* <img
                src={require('./images/svgexport-7.png')}
                alt='Adjust volume'
            /> */}
                    <MiniSongCard currentSongId={currentSong.songId} />
                    {/* <img src={require('./images/svgexport-9.png')} /> */}

                </div>
            }
        </>
    )
}

export default SongPlayer