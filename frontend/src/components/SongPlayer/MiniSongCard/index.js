import { useSelector } from "react-redux"

const MiniSongCard = ({ currentSongId }) => {
    const song = useSelector(state => state.songs[currentSongId])

    return (
        <div className="mini-song-card">
            <img className='mini-song-image' src={song?.imageUrl}></img>
            <div className="song-card-text">
                <h1>{song?.title}</h1>
                <h2>{song?.artist}</h2>
            </div>
        </div>
    )
}

export default MiniSongCard