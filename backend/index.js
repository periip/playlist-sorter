const app = require("./server.js");
const logger = require('./utils/logger.js')
const config = require("./utils/config.js");

const port = config.PORT || 5000;
app.listen(port, () => {
    logger.info(`Server running on port ${port}, http://localhost:${port}`)
});







