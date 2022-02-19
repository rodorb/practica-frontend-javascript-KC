import { domContentLoadedListener } from "../shared/domEventListeners.js";
import { NotificationController } from "../shared/notification/NotificationController.js";
import { CreateAdvertisementController } from "./CreateAdvertisementController.js";

domContentLoadedListener(() => {
    const notificationElement = document.querySelector('.notification');
    const createAdFormElement = document.querySelector('#loginForm');
    new NotificationController(notificationElement);
    new CreateAdvertisementController(createAdFormElement);
})