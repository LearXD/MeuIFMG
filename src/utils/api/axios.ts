import axios from "axios"
import config from "./config.json"
import { Alert } from "react-native"
import { BackHandler } from 'react-native'

const instance = () => {
  return axios.create({
    baseURL: config.baseURL,
    validateStatus: (status) => [
      200, // default
      201, // created
      204, // no content
      304, // not modified
      400, // bad request
      401, // unauthorized
      403, // forbidden
      404, // not found
      500, // internal server error
      502, // bad gateway
      503, // service unavailable
      504 // gateway timeout
    ].includes(status),
  })
}

const use = async (url: string, method: string, config?: object): Promise<any> => {
  try {
    return await instance().request({ url, method, ...config })
  } catch (error: any) {
    Alert.alert(
      'Erro',
      `Aconteceu um erro ao tentar se comunicar com os servidores do IFMG.\n\nPossiveis problemas:\n* Você não está conectado a internet.\n* O servidor do IFMG não está funcional\n* Existe uma atualização pendente do seu APP\n\nEspere alguns minutos, e caso o problema persista, entre em contato com contato@learxd.dev`,
      [
        {
          "text": "OK, SAIR.",
          onPress: () => {
            BackHandler.exitApp();
          }
        }
      ]
    )
  }
  return null
}

export const get = (url: string, config: any) => {
  return use(url, 'get', config)
}

export const post = (url: string, data: any, config?: any) => {
  return use(url, 'post', { data, ...config })
}

export default {
  get,
  post
}