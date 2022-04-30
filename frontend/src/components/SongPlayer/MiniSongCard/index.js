import { useSelector } from "react-redux"

const MiniSongCard = ({ currentSongId }) => {
    const song = useSelector(state => state.songs[currentSongId])
    console.log(song)

    return (
        <div className="mini-song-card">
            <img className='mini-song-image' src={song?.imageUrl}></img>
        </div>
    )
}

export default MiniSongCard