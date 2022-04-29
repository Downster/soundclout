import { useParams } from "react-router-dom"

const IndividualSong = () => {
    const { songId } = useParams()
    console.log(songId)

    return (
        <h1>dookie</h1>
    )
}

export default IndividualSong