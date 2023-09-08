/* 
  Bugs: 
    - first li having abnormal left margin
    - some images not loading on first render

  Things to do (by decreasing priority):
    - sorting by genre (and creating new rows) - IN PROGRESS -
    - music player (vertically)
    - form of storing data (probably locally, db maybeeeeee for cross-device)
    - new song generator by genre??? (might have to pull from spotify since youtube api is crap)
    - sort by other categories
    - creating custom categories (drag and drop)
    - css/appearance
    - hosting on website
UGH TOO MANY IDEAS

Focus on: music recommendation (I need that new music mmm) and genre sorter for YOUTUBE 
- For spotify they are also crap and only allow artist genres
- Last.fm has track genre but user-added

- Renaming Songs -> Tracks to match Youtube api naming

*/

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./features/playlist/Dashboard.js"
import SongLibrary from "./features/playlist/SongLibrary.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/library/:playlistId" element={<SongLibrary/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
