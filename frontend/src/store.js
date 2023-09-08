import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './features/rootReducer.js'

export default configureStore({
    reducer: rootReducer
})