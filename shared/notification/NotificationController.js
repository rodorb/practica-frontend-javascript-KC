import { buildNotificationView } from "./NotificationView.js";
import { pubSub } from "../pubSub.js";

export class NotificationController {
    constructor(notificationElement) {
        this.notificationElement = notificationElement;

        this.subscribeToEvents();
    }

    subscribeToEvents() {
        pubSub.subscribe(pubSub.TOPICS.SHOW_ERROR_NOTIFICATION, (message, callbackFn = null) => {
            this.notificationElement.classList.add("error");
            this.show(message, callbackFn);
        });

        pubSub.subscribe(pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION, (message, callbackFn = null) => {
            this.notificationElement.classList.add("success");
            this.show(message, callbackFn);
        });
    }

    show(message, callbackFn = null) {
        const noticationTemplate = buildNotificationView(message);

        this.notificationElement.innerHTML = noticationTemplate;

        const closeButtonelement = this.notificationElement.querySelector("button");

        closeButtonelement.addEventListener("click", () => {
            this.notificationElement.innerHTML = "";
            if (callbackFn) {
                callbackFn();
            }
        });
    }
}