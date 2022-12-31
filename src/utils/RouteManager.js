export const endpoint = "http://api.learxd.studio/"

export const getRoute = (route) => {
    return endpoint + (routes[route] ?? "")  
}

export const appendQuery = (url, queries) => {
    let query = "";
    for (let index in queries) {
        query += (query.length < 1) ? '?' : '&'
        query += `${index}=${queries[index]}`
    }
    return url + query;
}

export const routes = {
    status: 'status',
    login: 'v1/login',
    profile: 'v1/profile',
    historic: 'v1/historic',
    activities: 'v1/assessments',
    subjects: 'v1/subjects'
}

