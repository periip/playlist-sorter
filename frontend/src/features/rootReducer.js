import { combineReducers } from "@reduxjs/toolkit"
import playlistReducer from './playlist/playlistSlice.js'



export default combineReducers({
    playlist: playlistReducer
})