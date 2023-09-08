const request = require("request"); // could just use axios as well
const config = require("../utils/config.js");

const client_id = config.CLIENT_ID; 
const client_secret = config.CLIENT_SECRET

const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

const getToken = async () => {
  return new Promise((resolve) => {
    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(body.access_token);
      }
    });
  })
} 


module.exports = { getToken };
