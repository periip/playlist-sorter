import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import client from '../../api/client.js'

const initialState = {
    tracks: [],
    status: 'idle',
    error: null,
    id: 0
}

export const fetchSongs = createAsyncThunk(
  "playlist/fetchSongs",
  async (link) => {
    const response = await client.get(link);
    return response;
  }
);

export const assignGenres = createAsyncThunk(
  "playlist/fetchSongsByGenre",
  async (tracks, { getState }) => {
    const state = getState()
    const response = await client.getGenres(state.playlist.id, tracks);
    return response;
  }
);

const playlistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
      finishSorting: state => {
        state.status = "sorted"
      }
    },
    extraReducers(builder) { 
        builder
          .addCase(fetchSongs.fulfilled, (state, action) => {
            state.status = "succeeded";
            console.log(action.payload);
            state.tracks = state.tracks.concat(action.payload.items);
            state.id = action.payload.playlistId;
          })
          .addCase(assignGenres.fulfilled, (state, action) => {
            state.status = "sorting"
            action.payload.forEach((item) => {
              const song = state.tracks.find(
                (track) => track.snippet.resourceId.videoId === item.videoId
              );
              song.snippet.genres = item.genres;
            });
          })
          .addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state, action) => {
              state.status = "loading";
            }
          )
          .addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state, action) => {
              state.status = "failed";
              state.error = action.error.message;
            }
          );
    }
})

export const { finishSorting } = playlistSlice.actions // export reducers here, thunks get exported by themselves

export default playlistSlice.reducer

export const selectAllSongs = state => state.playlist.tracks;