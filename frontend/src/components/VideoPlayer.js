import React from "react";
import "../App.css";

const VideoPlayer = ({ track }) => {
  return (
    <iframe
      width="800"
      height="400"
      src={`https://www.youtube.com/embed/${track.snippet.resourceId.videoId}?&autoplay=1`}
      allowFullScreen={true}
      title={track.title}
      className="video-player"
    ></iframe>
  );
};

export default VideoPlayer
