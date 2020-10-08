import axios from 'axios';
import Vue from 'vue';
import router from '../router';
const http: any = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
});

http.interceptors.request.use((config: any) => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token  // 加上Bearer 是行业规范
    }
    return config;
}, (error: any) => {
    return Promise.reject(error)
})

http.interceptors.response.use((res: any) => {
    if (res.data) {
        return res.data;
    } else {
        return Promise.reject(res)
    }
}, (err: any) => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })

        if (err.response.status == 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http;