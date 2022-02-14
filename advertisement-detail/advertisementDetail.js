import { domContentLoadedListener } from "../shared/domEventListeners.js";
import { NotificationController } from "../shared/notification/NotificationController.js";
import { AdvertisementDetailController } from "./AdvertisementDetailController.js";

domContentLoadedListener(async() => {
    const searchParams = new URLSearchParams(window.location.search);
    const advertisementId = searchParams.get('id');
    const advertisementDetailElement = document.querySelector('.addvertisementDetail');
    const notificationElement = document.querySelector('.notification');
    const advertisementDetailController = new AdvertisementDetailController(advertisementDetailElement);
    new NotificationController(notificationElement);
    await advertisementDetailController.displayAdvertisementDetail(advertisementId);
})