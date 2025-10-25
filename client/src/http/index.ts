import axios, {type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError} from 'axios';

const $host = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const $authHost = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`
    return config
}


const errorHandler = (error: AxiosError) => {
    return Promise.reject(error);
}

$authHost.interceptors.request.use(authInterceptor)

$host.interceptors.response.use(
    (response: AxiosResponse) => response,
    errorHandler
);

export {
    $host,
    $authHost,
}