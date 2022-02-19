import { userService } from "../shared/services/UserService.js";
import { displaySpinner, onAnyInputChanges, publishErrorNotification, removeSpinner } from "../shared/utils/utils.js";

export class SignupController {
    constructor(sigunpFormElement) {
        this.sigunpFormElement = sigunpFormElement;
        this.subscribeToEvents();
    }

    subscribeToEvents() {
        onAnyInputChanges(this.sigunpFormElement);
        this.onSubmitForm();
    }

    onSubmitForm() {
        this.sigunpFormElement.addEventListener("submit", ($event) => {

            $event.preventDefault();
            const formData = new FormData(this.sigunpFormElement);
            const username = formData.get("textInput");
            const passwordInput = formData.get("passwordInput");
            const passwordMatchInput = formData.get("passwordMatchInput");
            const inputsAreValid = this.validateFormInputs(passwordInput, passwordMatchInput);
            if (inputsAreValid) {
                this.createUser(username, passwordInput);
            }
        });
    }

    validateFormInputs(passwordInput, passwordMatchInput) {
        const arePasswordsEqual = this.checkIfPasswordsAreEqual(
            passwordInput,
            passwordMatchInput
        );
        if (!arePasswordsEqual) {
            publishErrorNotification("Las contraseñas no son iguales");
            return false;
        }
        const isPasswordValid = this.checkIfPasswordMatchRegExp(passwordInput);
        if (!isPasswordValid) {
            publishErrorNotification("La contraseña debe contener sólo números o letras");
            return false;
        }

        return true;
    }

    checkIfPasswordsAreEqual(passwordInput, passwordMatchInput) {
        return passwordInput === passwordMatchInput;
    }

    checkIfPasswordMatchRegExp(password) {
        const passwordRegExp = new RegExp(/^[a-zA-Z0-9]*$/);

        return passwordRegExp.test(password);
    }

    async createUser(username, passwordInput) {
        const buttonElement = this.sigunpFormElement.querySelector("button");
        buttonElement.classList.add("hidden");
        displaySpinner(this.sigunpFormElement);
        try {
            await userService.createUser(username, passwordInput);
            this.loginUser(username, passwordInput);
        } catch (error) {
            publishErrorNotification(error);
        } finally {
            removeSpinner(this.sigunpFormElement);
            buttonElement.classList.remove("hidden");
        }
    }

    async loginUser(username, passwordInput) {
        try {
            await userService.loginUser(username, passwordInput);
            window.location.href = "/";
        } catch (error) {
            publishErrorNotification(error);
        }
    }

}