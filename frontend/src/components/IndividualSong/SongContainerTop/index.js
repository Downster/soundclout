import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux";
import WaveSurfer from 'wavesurfer';

const SongContainerTop = ({ song }) => {
    const { songId } = useParams()
    let waveSurfer;
    useEffect(() => {
        let waveSurfer = WaveSurfer.create({
            container: '#waveform'
        })
        waveSurfer.load(song.url)
    }, [])




    return (
        <div className="top-song-container">
            <div className="play-info">
                <img className='detail-play-button' src={require('./images/play-button.png')} />
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