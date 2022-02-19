import { userService } from "../shared/services/UserService.js";
import { displaySpinner, onAnyInputChanges, publishErrorNotification, removeSpinner } from "../shared/utils/utils.js";

export class LoginController {
    constructor(loginFormElement) {
        this.loginFormElement = loginFormElement;
        this.subscribeToEvents();
    }

    subscribeToEvents() {
        onAnyInputChanges(this.loginFormElement);
        this.onSubmitLoginForm();
    }

    onSubmitLoginForm() {
        this.loginFormElement.addEventListener("submit", ($event) => {
            $event.preventDefault();
            const formData = new FormData(this.loginFormElement);
            const username = formData.get("user");
            const password = formData.get("password");
            this.loginUser(username, password);
        });
    }

    async loginUser(username, password) {
        const buttonElement = this.loginFormElement.querySelector("button");
        buttonElement.classList.add("hidden");
        displaySpinner(this.loginFormElement);
        try {
            await userService.loginUser(username, password);
            window.location.href = "/";
        } catch (error) {
            publishErrorNotification(error);
        } finally {
            removeSpinner(this.loginFormElement);
            buttonElement.classList.remove("hidden");
        }
    }
}