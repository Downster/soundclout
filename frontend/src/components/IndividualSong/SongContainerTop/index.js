import { useParams, Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from 'wavesurfer.js';
import MarkersPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.markers.min.js';
import { formatTime } from "../../../utils/formatTime";
import { removeSong, updateSongTime } from "../../../store/selectedSong";
import './songContainerTop.css'


const SongContainerTop = ({ sessionUser, song, comments }) => {
    const dispatch = useDispatch()
    const currentSong = useSelector(state => state.currentSong)
    const [songDuration, setSongDuration] = useState();
    const [currentTime, setCurrentTime] = useState();
    const [isPlaying, setIsPlaying] = useState(false)
    const { songId } = useParams()
    const waveformRef = useRef();
    const timeInterval = useRef()
    const waveSurfer = useRef();
    const markersRef = useRef();

    // console.log(currentSong.song.seek())
    //setup markers array to push marker objects to


    //build songwaveform comment markers for each commen


    useEffect(() => {
        markersRef.current = new Set()
        for (let comment in comments) {
            const userPic = comments[comment].User.imageUrl
            const commentTime = comments[comment].time
            let imageUrl = userPic
            let userImage = document.createElement('img');
            userImage.src = imageUrl
            userImage.width = 20
            userImage.height = 20
            userImage.style.zIndex = 100;
            const markerObj = {
                time: commentTime,
                label: comments[comment].body,
                markerElement: imageUrl
            }
            markersRef.current.add(JSON.stringify(markerObj))
        }
        const markers = []
        markersRef.current.forEach((marker) => {
            const parsed = JSON.parse(marker)
            let userImage = document.createElement('img');
            userImage.src = parsed.markerElement
            userImage.width = 20
            userImage.height = 20
            userImage.style.zIndex = 100;
            parsed.markerElement = userImage;
            markers.push(parsed)
        })
        waveSurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: 'white',
            progressColor: '#f50',
            cursorColor: '#f50',
            // This parameter makes the waveform look like SoundCloud's player
            barWidth: 2,
            height: 100,
            hideScrollbar: true,
            plugins: [
                MarkersPlugin.create({
                    markers: markers
                })
            ]
        })
        waveSurfer.current.load(song.url)
        waveSurfer.current.on('ready', function () {
            setSongDuration(waveSurfer.current.getDuration())
            if (currentSong.songId === song.id) {
                waveSurfer.current.skip(currentSong.song.seek())
                waveSurfer.current.playPause()
                waveSurfer.current.setVolume(0)
                setIsPlaying(true)
            }
        })


        return () => {
            clearInterval(timeInterval.current);
            waveSurfer.current.stop()
            waveSurfer.current = null
            dispatch(removeSong())
        }
    }, [])
    useEffect(() => {
        dispatch(updateSongTime((currentTime) ? currentTime.toFixed(2) : undefined))
    }, [dispatch, currentTime])








    const playSong = () => {
        setIsPlaying(!isPlaying)
        if (waveSurfer.current.isPlaying()) {
            clearInterval(timeInterval.current);
        } else {
            timeInterval.current = setInterval(() => {
                setCurrentTime(waveSurfer.current.getCurrentTime());
            }, 300);
        }
        waveSurfer.current.playPause()
        waveSurfer.current.setVolume(0)
    }




    return (
        <>
            {song &&
                <div className="top-song-container">
                    <div className="left-div">
                        <div className="play-info">
                            <img className='detail-play-button' src={(isPlaying) ? require('./images/pause-button.png') : require('./images/play-button.png')} onClick={playSong} />
                            <div className="artist-song-info">

                                <h1 className="song-title">{song.title}</h1>
                                <Link to={`/${song.User?.username}`} className="song-creator">{song.User?.username}</Link>
                            </div>
                        </div>
                        <div className="wavebar-div">
                            <div id='wavesurfer' ref={waveformRef}>
                            </div>
                            <div className="total-time-show">{(songDuration) ? formatTime(songDuration) : 'Loading...'}</div>
                            <div className="current-time-show">{(currentTime) ? formatTime(currentTime) : ''}</div>

                        </div>

                    </div>
                    <div className="right-div">
                        <div className="uploaded-genre">

                        </div>
                        <div className="top-song-image">
                            <img className='individual-song-image' src={(song.Album?.imageUrl) ? song.Album.imageUrl : song.imageUrl}></img>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SongContainerTop