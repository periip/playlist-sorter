const spawn = require("child_process").spawn;
let Promise = require('bluebird')

const promiseFromChildProcess = (child) => {
  return new Promise((resolve, reject) => {
    child.addListener("error", reject);
    child.addListener("exit", resolve);
  })
}

const fetchSongs = ({ link }) => {
  return new Promise((resolve, reject) => {
    const child = spawn("python", ["./services/songFetcher.py"]);

    let parsedData = ''
    child.stdout.on("data", (data) => {
      // console.log(`stdout: ${data}`);
      parsedData = data;
    });

    child.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      reject(data)
    });

    child.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      resolve(parsedData);
    });


    child.stdin.write(link); 
    child.stdin.end();
  });
};

module.exports = { fetchSongs };
