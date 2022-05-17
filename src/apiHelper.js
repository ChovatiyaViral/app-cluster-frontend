import { isAuthentication } from './helper';

export const baseURL = 'http://localhost:4000/api'
const axios = require('axios');

const defaultHeaders = {
    isAuth: true,
    AdditionalParams: {},
    isJsonRequest: true
};


export const ApiGet = (type) => {
    return new Promise((resolve, reject) => {
        axios.get(baseURL + type, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    if (error.response.status === 401) {
                        // localStorage.clear();
                        window.location.reload()
                        return
                    }
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiDelete = (type) => {
    return new Promise((resolve, reject) => {
        axios.delete(baseURL + type, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    if (error.response.status === 401) {
                        // localStorage.clear();
                        window.location.reload()
                        return
                    }
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiPut = (type, data) => {
    return new Promise((resolve, reject) => {
        axios.put(baseURL + type, data, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    if (error.response.status === 401) {
                        // localStorage.clear();
                        window.location.reload()
                        return
                    }
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiPostNoAuth = (type, userData) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + type, userData)
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    if (error.response.status === 401) {
                        // localStorage.clear();
                        window.location.reload()
                        return
                    }
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}

export const ApiPost = (type, data) => {
    return new Promise((resolve, reject) => {
        axios.post(baseURL + type, data, getHttpOptions())
            .then((responseJson) => {
                resolve(responseJson);
            })
            .catch((error) => {
                if (error && error.hasOwnProperty('response') &&
                    error.response && error.response.hasOwnProperty('data') && error.response.data &&
                    error.response.data.hasOwnProperty('error') && error.response.data.error) {
                    if (error.response.status === 401) {
                        // localStorage.clear();
                        window.location.reload()
                        return
                    }
                    reject(error.response.data.error);
                } else {
                    reject(error);
                }
            });
    });
}

export const getHttpOptions = (options = defaultHeaders) => {
    let headers = {};

    if (options.hasOwnProperty('isAuth') && options.isAuth) {
        headers['x-access-token'] = isAuthentication();
    }

    if (options.hasOwnProperty('isJsonRequest') && options.isJsonRequest) {
        headers['Content-Type'] = 'application/json';
    }

    if (options.hasOwnProperty('AdditionalParams') && options.AdditionalParams) {
        headers = { ...headers, ...options.AdditionalParams };
    }

    return { headers }
}