import { getLocalStorageParsedItem, setLocalStorageParsedItem } from "../storageUtils.js";
import { ENDPOINTS } from "./apiUrls.js";

class UserService {
    METHODS = {
        POST: 'POST'
    }
    constructor() {}

    async createUser(username, password) {
        const body = {
            username,
            password
        }
        const response = await fetch(ENDPOINTS.signupAPI, {
            method: this.METHODS.POST,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
    }

    async loginUser(username, password) {
        const body = {
            username,
            password
        }

        const response = await fetch(ENDPOINTS.loginAPI, {
            method: this.METHODS.POST,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        const token = data.accessToken;
        setLocalStorageParsedItem('jwt', token);
    }

    getLoggedUser() {
        return getLocalStorageParsedItem('jwt');
    }

    removeUserToken() {
        localStorage.removeItem('jwt');
    }
}

export const userService = new UserService();