import { domContentLoadedListener } from "../shared/domEventListeners.js"
import { NotificationController } from "../shared/notification/NotificationController.js";
import { AdvertisementListController } from "./AdvertisementListController.js"



domContentLoadedListener(async() => {
    const notificationElement = document.querySelector('.notification');
    const advertisementsListElement = document.querySelector('.addvertisementList');
    const adListController = new AdvertisementListController(advertisementsListElement);
    new NotificationController(notificationElement);
    await adListController.displayAdvertisments();
});