import axios from "axios"

import { appendQuery, getRoute } from './RouteManager'

export const request = (url, method = 'GET', data) => {
    return axios({
        url,
        method,
        validateStatus: () => true,
        ...data
    })
    .catch((e) => console.log(e))
    .then(response => {
        switch(response.status) {
            case 200:
            case 201:
            case 301:
                return response
        }
        throw new Error(response.data.error.message)
    })
}

export const getAcivities = async (token, id) => {
    return request(
        appendQuery(getRoute('activities'), {id}), 
        'GET',
        {
           headers: {token} 
        }
    )
}

export const getSubjects = (token) => {
    return request(getRoute('subjects'), 'GET', {
        headers: {token}
    })
}