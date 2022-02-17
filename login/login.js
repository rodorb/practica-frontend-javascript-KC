import { domContentLoadedListener } from "../shared/domEventListeners.js";
import { NotificationController } from "../shared/notification/NotificationController.js";
import { LoginController } from "./LoginController.js";

domContentLoadedListener(() => {
    const loginFormElement = document.querySelector('#loginForm');
    const notificationElement = document.querySelector('.notification');
    new LoginController(loginFormElement);
    new NotificationController(notificationElement);
})