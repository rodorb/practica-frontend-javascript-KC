import { userService } from "../shared/services/UserService.js";
import { onAnyInputChanges, publishErrorNotification } from "../shared/utils.js";

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
        try {
            await userService.loginUser(username, password);
            window.location.href = "/";
        } catch (error) {
            publishErrorNotification(error);
        }
    }
}