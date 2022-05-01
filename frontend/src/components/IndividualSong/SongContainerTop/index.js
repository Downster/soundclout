import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux";
import WaveSurfer from 'wavesurfer.js';

const SongContainerTop = ({ song }) => {
    const { songId } = useParams()
    let waveSurfer;
    useEffect(() => {
        waveSurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'grey',
            progressColor: '#f50',
            cursorColor: '#f50',
            // This parameter makes the waveform look like SoundCloud's player
            barWidth: 3
        })
        waveSurfer.load(song.url)
    }, [])

    const playSong = () => {
        waveSurfer.playPause()
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
            <div id='waveform'>

            </div>
        </div>
    )
}

export default SongContainerTop