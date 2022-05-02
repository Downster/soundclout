import { useParams, Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from 'wavesurfer.js';
import { formatTime } from "../../../utils/formatTime";
import { updateSongTime } from "../../../store/selectedSong";

const SongContainerTop = ({ song }) => {
    const dispatch = useDispatch()
    const [songDuration, setSongDuration] = useState();
    const [currentTime, setCurrentTime] = useState();
    const { songId } = useParams()
    const waveformRef = useRef();
    const timeInterval = useRef()
    const waveSurfer = useRef();
    useEffect(() => {
        waveSurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: 'grey',
            progressColor: '#f50',
            cursorColor: '#f50',
            // This parameter makes the waveform look like SoundCloud's player
            barWidth: 3,
        })
        waveSurfer.current.load(song.url)
        waveSurfer.current.on('ready', function () {
            setSongDuration(waveSurfer.current.getDuration())
        })

        return () => {
            clearInterval(timeInterval.current);
            waveSurfer.current.stop()
            waveSurfer.current = null
        }
    }, [])
    useEffect(() => {
        dispatch(updateSongTime((currentTime) ? currentTime.toFixed(2) : undefined))
    }, [dispatch, currentTime])








    const playSong = () => {
        if (waveSurfer.current.isPlaying()) {
            clearInterval(timeInterval.current);
        } else {
            timeInterval.current = setInterval(() => {
                setCurrentTime(waveSurfer.current.getCurrentTime());
                console.log('playing')
            }, 300);
        }
        waveSurfer.current.playPause()
    }




    return (
        <div className="top-song-container">
            <div className="play-info">
                <img className='detail-play-button' src={require('./images/play-button.png')} onClick={playSong} />
                <h1 className="song-title">{song.title}</h1>
                <Link to={`/${song.User?.username}`} className="song-creator">{song.User?.username}</Link>
            </div>
            <div className="uploaded-genre">

            </div>
            <div className="image">
                <img className='song-image' src={(song.Album?.imageUrl) ? song.Album.imageUrl : song.imageUrl}></img>
            </div>
            <div ref={waveformRef}>
                <div id='wave-timeline'>

                </div>
            </div>
            <div>Total time:{(songDuration) ? formatTime(songDuration) : 'Loading...'}</div>
            <div>Current time:{(currentTime) ? formatTime(currentTime) : '0:00'}</div>
        </div>
    )
}

export default SongContainerTop