import { domContentLoadedListener } from "../shared/domEventListeners.js";
import { NotificationController } from "../shared/notification/NotificationController.js";
import { SignupController } from "./SignupController.js";

domContentLoadedListener(() => {
    const formElement = document.querySelector('#signupForm');
    const notificationElement = document.querySelector('.notification');
    new SignupController(formElement);
    new NotificationController(notificationElement);
})