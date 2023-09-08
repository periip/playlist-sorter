import { useState, useId } from "react";
import "../../App.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [link, setLink] = useState("");
    const linkInputId = useId();

    return (
      <div className="page horizontal-center">
        <div className="intro-container">
          <h2>Organize Youtube Music Playlists by Genre!</h2>
          <p>
            A music player that also helps organize playlists by genre, song
            length, date added, and much more!
          </p>
        </div>

        <form method="get" className="form-container">
          <label htmlFor={linkInputId}>
            Type a Youtube Music playlist link:
          </label>
          <input
            id={linkInputId}
            name="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <Link to={`/library/${link}`}>
            <button type="submit" className="button">
              Organize Playlist
            </button>
          </Link>
        </form>
      </div>
    );
}

export default Dashboard;
