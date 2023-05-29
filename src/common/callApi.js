import axios from "axios"

const base_url = "http://localhost:3333"
export const callApi = {
    getApi: async (endpoint, body) => {
        let res = await axios.get(base_url+endpoint, {params:body})
        return res.data
    },
    postApi: async (endpoint, body) => {
        let res = await axios.post(base_url+endpoint, body)
        return res.data
    },
    putApi: async(endpoint, body) => {
        let res = await axios.put(base_url+endpoint, body)
        return res.data
    },
    deleteApi: async (endpoint, body) => {
        let res = await axios.delete(base_url+endpoint, body)
        return res.data
    }
}