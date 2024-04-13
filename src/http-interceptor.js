import axios from "axios";
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    basebaseUrl:'https://academics.newtonschool.co/api/v1'
});

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['projectID']='uvm5bpzyk34e'
        return config;
    },(error)=>{
        console.error("Request interceptor error:", error);
        return Promise.reject(error);
    }
);
axiosInstance.interceptors.response.use(
    (response) =>{
        return response;
    },
    (error)=>{
        toast.error(error.message)
        return Promise.reject(error);
    }
);
export default axiosInstance;