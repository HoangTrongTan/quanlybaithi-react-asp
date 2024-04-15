import axios from "axios";

const api = axios.create( {
    baseURL:"https://localhost:7029/api/",
    headers:{
        'Content-Type':"application/json",
    }
} );

export const get = async (path) => {
    const res = await api.get(path);
    return res.data;
}

export const post = async (path,data) => {
    const res = await api.post(path,data);
    return res.data;
}
export const put = async (path,data) => {
    const res = await api.put(path,data);
    return res.data;
}
export const del = async (path) => {
    const res = await api.delete(path);
    return res.data;
}
export const delObjPass = async (path,obj) => {
    const res = await api.delete(path, obj);
    return res.data;
}
export default api;