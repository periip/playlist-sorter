const express = require("express")
const cors = require("cors")
const songsRouter = require("./controllers/songs.js");
const middleware = require('./utils/middleware.js')
const config = require("./utils/config.js");
const logger = require('./utils/logger.js')

logger.info('connecting to', config.DATABASE_HOST)

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(middleware.requestLogger)

app.use("/api/v1/songs", songsRouter);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

