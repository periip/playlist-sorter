import React from "react";
import "../App.css";

const Track = ({ thumbnails, title, id, displayPlayer }) => {
  const thumbnail = thumbnails.maxres;

  return (
    <li key={id} className="track-item--layout">
      <button onClick={() => displayPlayer(id)} className="player-button">
        <img src={thumbnail.url} alt={title} className="thumbnail" />
      </button>
    </li>
  );
};

export default Track
