const API_URLS = {
    BASE_URL: "http://localhost:8080/api/v1",
    ADD_EMPLOYEE: "/auth/register",
    LOGIN_EMPLOYEE: "/auth/authenticate",
    LOGIN_ADMIN: "/auth/authenticate",
    APPLY_LOAN: "/loan/apply",
    GET_ALL_ITEMS: "/item/all",
    GET_ALL_LOAN_CARDS: "/loanCard/all",
    GET_EMPLOYEE: (username) => `/employee/${username}`,
    GET_ALL_EMPLOYEE_ISSUES: (username) => `/employeeIssue/${username}/all`,
    GET_ALL_EMPLOYEE_CARDS: (username) => `/employeeCard/${username}/all`,
    ADD_ITEM: (adminUsername) => `/item/add?userName=${adminUsername}`,
    ADD_LOAN_CARD: (adminUsername) => `/loanCard/add?userName=${adminUsername}`,
    GET_ALL_EMPLOYEES: (adminUsername) => `/employee/all?userName=${adminUsername}`,
    DELETE_EMPLOYEE: (adminUsername, employeeId) => `/employee/${employeeId}?userName=${adminUsername}`,
    DELETE_ITEM: (adminUsername, itemId) => `/item/${itemId}?userName=${adminUsername}`,
    DELETE_LOAN_CARD: (adminUsername, loanCardId) => `/loanCard/${loanCardId}?userName=${adminUsername}`,
    EDIT_EMPLOYEE: (adminUsername, employeeId) => `/employee/${employeeId}?userName=${adminUsername}`,
    EDIT_ITEM: (adminUsername, itemId) => `/item/${itemId}?userName=${adminUsername}`,
    EDIT_LOAN_CARD: (adminUsername, loanCardId) => `/loanCard/${loanCardId}?userName=${adminUsername}`,
    REFRESH_TOKEN: `/auth/refresh-token`
}

export default API_URLS;
