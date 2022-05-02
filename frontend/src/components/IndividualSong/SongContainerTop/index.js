import { useParams, Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import WaveSurfer from 'wavesurfer.js';
import MarkersPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.markers.min.js';
import { formatTime } from "../../../utils/formatTime";
import { removeSong, updateSongTime } from "../../../store/selectedSong";


const SongContainerTop = ({ sessionUser, song, comments }) => {
    console.log(comments)
    const dispatch = useDispatch()
    const [songDuration, setSongDuration] = useState();
    const [currentTime, setCurrentTime] = useState();
    const { songId } = useParams()
    const waveformRef = useRef();
    const timeInterval = useRef()
    const waveSurfer = useRef();
    const markersRef = useRef();
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
        console.log(markersRef.current)
        waveSurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: 'grey',
            progressColor: '#f50',
            cursorColor: '#f50',
            // This parameter makes the waveform look like SoundCloud's player
            barWidth: 3,
            plugins: [
                MarkersPlugin.create({
                    markers: markers
                })
            ]
        })
        waveSurfer.current.load(song.url)
        waveSurfer.current.on('ready', function () {
            setSongDuration(waveSurfer.current.getDuration())
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
        <>
            {song &&
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
            }
        </>
    )
}

export default SongContainerTop