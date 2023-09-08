const config = require("../utils/config.js");

const fetchGenres = (title, artist) => { // a real pain, but could pass data through musicbrainz to get id if search is bad
    fetch(
      `http://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist=${artist}&track=${title}&api_key=${config.LASTFM_API_KEY}&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Artist:", artist)
        
        if (data.toptags.tag.length === 0) { // yikes this is bad, lastfm api missing lot of info so have to fall back on artist tags
          fetch(
            `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${artist}&api_key=${config.LASTFM_API_KEY}&format=json`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data.toptags.tag);
            });
        }
      })
      .catch((err) => console.error(err));
} 

module.exports = { fetchGenres };