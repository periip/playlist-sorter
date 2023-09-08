const axios = require('axios')
const config = require('../utils/config.js')

const getPlaylist = async (id) => {

}

const getPlaylistItems = async (id) => {
  const result = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems`,
    {
      params: {
        part: "snippet",
        maxResults: 10,
        playlistId: id,
        key: config.YOUTUBE_API_KEY,
      },
    }
  );
  return result.data;
};

module.exports = { getPlaylist, getPlaylistItems }





