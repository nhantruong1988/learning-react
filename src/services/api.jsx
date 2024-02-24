import axios from "../utils/axios-customize"

export const callRegister = (email, password, name, phone, address) => {
    return axios.post('/auth/signup', {email, password, name, phone, address});
}

export const callLogin = (email, password) => {
    return axios.post('/auth/login', {email, password});
}

export const callCategory = () => {
    return axios.get('/category/list');
}

export const callProducts = () => {
    return axios.get('/product/list');
}

export const getProductById = (id) => {
    const link = axios.get(`/product/${id}`);
    console.log(link);
    return link;
}

export const createUser = (userId, name, password, address, phone, email ) => {
    return axios.put('/user/${userId}', {name, password, address, phone, email});
}

export const callUserLists = () => {
    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
    return axios.get('/user/list', config);
}