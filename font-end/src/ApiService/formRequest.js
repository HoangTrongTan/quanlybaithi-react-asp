import axios from "axios";

const api = axios.create({
    baseURL:"https://localhost:7029/api/",
    headers:{
        "Content-Type": "multipart/form-data",
    }
});
const post = async (url,data) => {
    const res = await api.post(url,data);
    return res.data;
};
const get = async (url) => {
    const res = await api.get(url);
    return res.data;
};
const put = async (url,data) => {
    const res = await api.put(url,data);
    return res.data;
};
const del = async (url) => {
    const res = await api.delete(url);
    return res.data;
};
export default api;
export { post,get,put,del };