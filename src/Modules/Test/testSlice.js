import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
    counter: 0,
    posts: [],
    loading:'idle'
}
export const fetchPosts = createAsyncThunk('test/fetchPosts',async ()=>{
    // return await fetch('https://jsonplaceholder.typicode.com/posts').then(response=>response.json())
    throw Error("Failed")
})
const testSlice = createSlice({
    name: 'test',
    initialState,
    reducers: {
        increment: state => {
            state.counter +=1 
        },
        decrement: state => {
            state.counter -= 1
        },
        reset: state => {
            state.counter = initialState.counter
        },
        update: (state, action) => {
            state.counter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state,{payload})=>{
            state.loading = 'pending'
        })   
        builder.addCase(fetchPosts.fulfilled, (state,{payload})=>{
            state.posts = payload
            state.loading = 'idle'
        })   
        builder.addCase(fetchPosts.rejected, (state,{payload})=>{
            state.loading = 'failed'
        })   
    }

})


export const { increment, decrement, reset, update } = testSlice.actions
export default testSlice.reducer