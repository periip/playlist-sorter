const auth = require('./spotifyAuth.js')
const request = require("request"); // could just use axios as well


const fetchArtistGenres = async (artist) => {
    const token = await auth.getToken();
    const options = {
      url: `https://api.spotify.com/v1/search?q=artist:${artist}&type=artist&market=US&limit=1`,
      headers: {
        Authorization: "Bearer " + token,
      },
      json: true,
    };

    return new Promise((resolve) => {
          request.get(options, (error, response, body) => {
          if (body.artists.items.length) {
            resolve(body.artists.items[0].genres); 
          } else {
            resolve([])
          }
        });
    })
}

module.exports = { fetchArtistGenres }