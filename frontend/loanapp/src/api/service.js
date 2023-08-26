import axiosInstance from "./axiosInstance";
import API_URLS from "./apiUrls";
import { redirect, useNavigate } from "react-router-dom";
import { successToast } from "../utils/ToastUtils";


export const addEmployee = (requestBody) => {
    return axiosInstance.post(API_URLS.ADD_EMPLOYEE, {...requestBody, role: "EMPLOYEE"});
};

export const loginEmployee = (requestBody) => {
    return axiosInstance.post(API_URLS.LOGIN_EMPLOYEE, requestBody);
}

export const loginAdmin = (requestBody) => {
    return axiosInstance.post(API_URLS.LOGIN_ADMIN, requestBody);
}

export const applyLoan = (requestBody) => {
    return axiosInstance.post(API_URLS.APPLY_LOAN, requestBody);
}

export const getAllItems = () => {
    return axiosInstance.get(API_URLS.GET_ALL_ITEMS);
}

export const getAllLoanCards = () => {
    return axiosInstance.get(API_URLS.GET_ALL_LOAN_CARDS);
}

export const getEmployee = (username) => {
    return axiosInstance.get(API_URLS.GET_EMPLOYEE(username));
}

export const getAllEmployeeCards = (username) => {
    return axiosInstance.get(API_URLS.GET_ALL_EMPLOYEE_CARDS(username));
}

export const getAllEmployeeIssues = (username) => {
    return axiosInstance.get(API_URLS.GET_ALL_EMPLOYEE_ISSUES(username));
}

export const addItem = (adminUsername, requestBody) => {
    return axiosInstance.post(API_URLS.ADD_ITEM(adminUsername), requestBody);
}

export const addLoanCard = (adminUsername, requestBody) => {
    return axiosInstance.post(API_URLS.ADD_LOAN_CARD(adminUsername), requestBody);
}

export const getAllEmployees = (adminUsername) => {
    return axiosInstance.get(API_URLS.GET_ALL_EMPLOYEES(adminUsername));
}

export const deleteEmployee = (adminUsername, employeeId) => {
    return axiosInstance.delete(API_URLS.DELETE_EMPLOYEE(adminUsername, employeeId))
}

export const deleteItem = (adminUsername, itemId) => {
    return axiosInstance.delete(API_URLS.DELETE_ITEM(adminUsername, itemId))
}

export const deleteLoanCard = (adminUsername, loanCardId) => {
    return axiosInstance.delete(API_URLS.DELETE_LOAN_CARD(adminUsername, loanCardId))
}

export const editEmployee = (adminUsername, employeeId, requestBody) => {
    return axiosInstance.put(API_URLS.EDIT_EMPLOYEE(adminUsername, employeeId), requestBody)
}

export const editItem = (adminUsername, itemId, requestBody) => {
    return axiosInstance.put(API_URLS.EDIT_ITEM(adminUsername, itemId), requestBody)
}

export const editLoanCard = (adminUsername, loanCardId, requestBody) => {
    return axiosInstance.put(API_URLS.EDIT_LOAN_CARD(adminUsername, loanCardId), requestBody)
}

export const logoutUser = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href='/login';
}

export const refreshAccessToken = async () => {
    try {
        const response = await axiosInstance.post(API_URLS.REFRESH_TOKEN);
        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);

        successToast('refreshed token successfully');

        return newAccessToken;
    } catch (error) {
        logoutUser();
        return null;
    }
}

