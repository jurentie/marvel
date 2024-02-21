import config from '../config.json'
import axios from "axios"

const marvelAxios = axios.create({
    baseURL: config.marvelBaseUrl
})

const httpClient = {
    getCharacters: async (offset, limit) => {
        try{
            // eslint-disable-next-line
            const response = await marvelAxios.get("/characters", {
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
            console.log("error GET /characters : " + err)
        }
    },
    getCharacter: async(characterId) => {
        try{
            // eslint-disable-next-line
            const response = await marvelAxios.get("/characters/" + characterId, {
                params: {
                    ts: config.ts,
                    apikey: config.publicKey,
                    hash: config.hash
                }
            })
            return response.data.data.results[0]
        }catch(err) {
            console.log("error GET /characters/" + characterId + " : " + err)
        }
    }
}

export default httpClient