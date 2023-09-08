import { useState, useEffect } from "react";
import "../../App.css";
import VideoPlayer from "../../components/VideoPlayer.js";
import TrackList from "../../components/TrackList.js";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectAllSongs,
  fetchSongs,
  assignGenres,
  finishSorting,
} from "./playlistSlice.js";

/*
  Features to add for sorting/organizing:
  - Error handling for playlist that is invalid
  - Option to pass song information to different api (lastfm) if spotify fails
  - Option to delete, add, and edit lists of songs
  - Options to add other sorting methods (date added to playlist, song length, artist)
  
*/
const SongLibrary = () => {
  const { playlistId } = useParams();
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();
  const playlistStatus = useSelector((state) => state.playlist.status);
  const tracks = useSelector(selectAllSongs);

  useEffect(() => {
    if (playlistStatus === "idle") {
      dispatch(fetchSongs(playlistId));
    } else if (playlistStatus === "sorting") {
      sortSongs();
    }
  }, [playlistStatus, dispatch, playlistId]);

  const displayPlayer = (id) => {
    setIsPlayerVisible(true);
    setSelectedId(id);
  };

  const organizeTracks = () => {
    const snippets = tracks.map((track) => track.snippet);
    dispatch(assignGenres(snippets));
  };

  const addCategory = (category) => {
    setGenres([...genres, category])
  }

  const sortSongs = () => {
    const possibleGenres = [];

    tracks.forEach((track) => {
      const genres = track.snippet.genres;
      for (let genre of genres) {
        if (!possibleGenres.includes(genre)) {
          possibleGenres.push(genre);
        }
      }
      if (!genres.length && !possibleGenres.includes("unclassified")) {
        possibleGenres.push("unclassified");
      }
    });
    dispatch(finishSorting());
    setGenres(possibleGenres);
  };

  const renderTrackList =
    playlistStatus === "succeeded" ? (
      <TrackList genre={"Unclassified"} displayPlayer={displayPlayer} />
    ) : playlistStatus === "sorted" ? (
      genres.map((genre) => (
        <TrackList genre={genre} displayPlayer={displayPlayer} key={genre} />
      ))
    ) : null;

  return (
    <div className="page">
      {isPlayerVisible ? (
        <VideoPlayer
          track={tracks.find(
            (track) => track.snippet.resourceId.videoId === selectedId
          )}
        />
      ) : null}
      <h1 className="library-header">Library</h1>
      <button onClick={organizeTracks}>organize music</button>
      <button onClick={addCategory}>add category</button>
      <ul>{renderTrackList}</ul>
    </div>
  );
};

export default SongLibrary;
