import axios from "axios"

import { appendQuery, getRoute } from './RouteManager'

/*
    Todos os codigos aceitos de acordo com a documentação da API
    200 - OK
    201 - Created
    301 - Moved Permanently
    409 - Conflict
    401 - Unauthorized
*/
export const ACCEPTED_STATUS = [200, 201, 301];

export const request = (url, method = 'GET', data) => {
    return axios({
        url,
        method,
        validateStatus: () => true,
        ...data
    })
    .catch((e) => console.log(e))
    .then(response => {
        if(ACCEPTED_STATUS.includes(response.status)) {
            return response
        }
        throw new Error(response.data.error.message)
    })
}

export const getProfile = (token) => {
    return request(getRoute('profile'), 'GET', {headers: {token}})
}

export const getHistoric = (token) => {
    return request(getRoute('historic'), 'GET', {headers: {token}})
}

export const getAcivities = (token, id) => {
    return request(
        appendQuery(getRoute('activities'), {id}), 'GET', {headers: {token}}
    )
}

export const getSubjects = (token) => {
    return request(getRoute('subjects'), 'GET', {headers: {token}})
}