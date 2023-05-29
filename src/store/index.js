import { combineReducers, configureStore } from "@reduxjs/toolkit"
import testSlice from '../Modules/Test/testSlice'

const reducer = combineReducers({
    test: testSlice,
})
const store = configureStore({
    reducer
})

export default store