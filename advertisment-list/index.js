import { domContentLoadedListener } from "../shared/domEventListeners.js"
import { AdvertisementListController } from "./AdvertisementListController.js"



domContentLoadedListener(async() => {
    const advertisementsListElement = document.querySelector('.addvertisementList');
    const adListController = new AdvertisementListController(advertisementsListElement);
    await adListController.displayAdvertisments();
});