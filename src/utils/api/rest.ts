import axios from "axios"
import config from "./config.json"

const instance = (url: string) => {
  return axios.create({
    baseURL: config.baseURL,
    //timeout: 15000
  })
}

export const get = (url: string, config: any) => {
  return instance(url).get(url, config)
}

export const post = (url: string, data: any, config?: any) => {
  return instance(url).post(url, data, config)
}

export default {
  get,
  post
}