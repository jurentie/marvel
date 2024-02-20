import config from '../config.json'
import axios from "axios"

const marvelAxios = axios.create({
    baseURL: config.marvelBaseUrl
})

const httpClient = {
    get: async (path) => {
        try{
            // eslint-disable-next-line
            const response = marvelAxios.get(path + "?ts=" + config.ts + "&" + "apiKey=" + config.publicKey + "&hash=" + config.hash)
            return response
        }catch(err) {
            console.log("error GET " + path + " : " + err)
        }
    }
}

export default httpClient