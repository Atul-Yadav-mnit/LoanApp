import axios from "axios";
import API_URLS from "./apiUrls"

const axiosInstance = axios.create({
    baseURL: API_URLS.BASE_URL,
});

export default axiosInstance;
