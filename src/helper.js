
export const baseURL = 'http://localhost:4000/api'

export const isAuthentication = () => {
    const token = localStorage.getItem("token");
    return token;
}

export const setToken = (token) => {
    localStorage.setItem('token', token)
}