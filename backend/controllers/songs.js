const express = require('express')
const knex = require("../connection.js");
const pythonChild = require("../services/pythonChild.js"); // for unoficcial ytmusic api
const songsRouter = express.Router()
const lastFm = require("../services/lastfm.js") // for lastfm api
const youtube = require('../services/youtube.js') // for youtube data v3 api
const spotify = require('../services/spotify.js')

const myPlaylistId = "PLVGrppNx4fkasny1aAt2IdYaYuD4ItPlC";
const testId = "PLPK7133-0ahmzknIfvNUMNJglX-O1rTd2";

// GET: Fetch all movies from the database
songsRouter.get('/', (req, res, next) => {
    // knex.select('*')
    //     .from('movies')
    //     .then((data) => {
    //         console.log(data);
    //         res.json(data);
    //     })
    //     .catch((err) => {
    //         next(err);
    //     });
    
});

// GET: Fetch movie by id from the database
songsRouter.get('/:id', async (req, res, next) => {
    // const movieId = req.params.id;
    // knex.select('*')
    //     .from('movies')
    //     .where('movie_id', '=', movieId)
    //     .then((data) => {
    //         console.log(data);
    //         res.json(data);
    //     })
    //     .catch((err) => {
    //         next(err);
    //     });

    let link = req.params.id
    link = testId

    // let songs = (await pythonChild.fetchSongs(link)).toString();
    const songs = await youtube.getPlaylistItems(link)
    songs.playlistId = link;
    songs.items.map((track) => {
        track.snippet.genres = []
    })
    res.json(songs)
});

// GET: Fetch movie by id from the database
songsRouter.post('/:id/genres', async (req, res, next) => {
    // const movieId = req.params.id;
    // knex.select('*')
    //     .from('movies')
    //     .where('movie_id', '=', movieId)
    //     .then((data) => {
    //         console.log(data);
    //         res.json(data);
    //     })
    //     .catch((err) => {
    //         next(err);
    //     });
    const tracks = req.body
    const tracksWithGenres = []

    await Promise.all(tracks.map(async (track) => {
        let { videoOwnerChannelTitle, resourceId: { videoId } } = track;
        videoOwnerChannelTitle = videoOwnerChannelTitle.replace(/ - Topic|'/g, "");
        const genres = await spotify.fetchArtistGenres(videoOwnerChannelTitle);
        tracksWithGenres.push({ genres, videoId});
    }))
    res.json(tracksWithGenres)
});

// POST: Create movies and add them to the database
songsRouter.post('/', (req, res, next) => {
    // const { movieName, imgUrl, releaseYear, summary, director, genre, rating, movieRuntime, metaScore } = req.body;
    // knex('movies')
    //     .insert({
    //         movie_name: movieName,
    //         img_url: imgUrl,
    //         release_year: releaseYear,
    //         summary: summary,
    //         director: director,
    //         genre: genre,
    //         rating: rating,
    //         movie_runtime: movieRuntime,
    //         meta_score: metaScore,
    //     })
    //     .then(() => {
    //         console.log('Movie Added');
    //         return res.json({ msg: 'Movie Added' });
    //     })
    //     .catch((err) => {
    //         next(err);
    //     });
});

// DELETE: Delete movie by movieId from the database

songsRouter.delete('/:id', (req, res, next) => {
    // const movieId = req.params.id;
    // knex('movies')
    //     .where('movie_id', '=', movieId)
    //     .del()
    //     .then(() => {
    //         console.log('Movie Deleted');
    //         return res.json({ msg: 'Movie Deleted' });
    //     })
    //     .catch((err) => {
    //         next(err);
    //     });
});

// PUT: Update movie by movieId from the database
songsRouter.put('/:id', (req, res, next) => {
    // const movieId = req.params.id
    // knex('movies')
    //     .where('movie_id', '=', movieId)
    //     .update({ movie_name: 'learn how to create more parameters' })
    //     .then(() => {
    //         console.log('Movie Updated');
    //         return res.json({ msg: 'Movie Updated' });
    //     })
    //     .catch((err) => {
    //         next(err);
    //     });
});

module.exports = songsRouter