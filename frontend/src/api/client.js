import axios from "axios";

const baseUrl = "http://localhost:8000/api/v1/songs/";


const get = async (id) => {
    return axios
        .get(baseUrl + id)
        .then(res => res.data)
        .catch(err => console.error(err))
};

const getGenres = async (id, tracks) => {
    return axios
      .post(`${baseUrl}${id}/genres`, tracks)
      .then((res) => res.data)
      .catch((err) => console.error(err));
}

const post = () => {

}

const requests = {
    get,
    post,
    getGenres
}

export default requests
