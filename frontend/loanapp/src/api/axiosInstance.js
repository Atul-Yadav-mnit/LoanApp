import axios from "axios";
import API_URLS from "./apiUrls"
import {logoutUser, refreshAccessToken} from "./service";
import { failureToast } from "../utils/ToastUtils";

const axiosInstance = axios.create({
    baseURL: API_URLS.BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.code == "ERR_NETWORK") {
            error.response = {
                data: {
                    message: "Could not connect to the server"
                }
            };
        } else if (error.response.status == 403) {
            await refreshAccessToken();
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;
