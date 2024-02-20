import config from '../config.json'
import axios from "axios"

const marvelAxios = axios.create({
    baseURL: config.marvelBaseUrl
})

const httpClient = {
    get: async (path, offset, limit) => {
        try{
            // eslint-disable-next-line
            const response = await marvelAxios.get(path, {
                params: {
                    ts: config.ts,
                    apikey: config.publicKey,
                    hash: config.hash,
                    offset: offset,
                    limit: limit
                }
            })
            return response.data
        }catch(err) {
            console.log("error GET " + path + " : " + err)
        }
    }
}

export default httpClient