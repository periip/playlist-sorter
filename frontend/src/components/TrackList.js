import Track from "./Track.js";
import { selectAllSongs } from "../features/playlist/playlistSlice.js";
import { useSelector } from "react-redux";

const TrackList = ({ genre, displayPlayer }) => { // doesn't keep genre state on refresh
    const tracks = useSelector(selectAllSongs);

    const trackList = tracks
      .filter((track) =>
        genre === "unclassified"
          ? track.snippet.genres.length === 0
          : track.snippet.genres.includes(genre)
      )
      .map((track) => (
        <Track
          thumbnails={track.snippet.thumbnails}
          title={track.snippet.title}
          id={track.snippet.resourceId.videoId}
          key={track.snippet.resourceId.videoId}
          displayPlayer={displayPlayer}
        />
      )); 


    return (
      <ul>
        <h3>{genre}</h3>
        <ul className="track-list">{trackList}</ul>
      </ul>
    );
};

export default TrackList;
