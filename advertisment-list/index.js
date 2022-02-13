import { domContentLoadedListener } from "../shared/domEventListeners.js"
import { AdvertisementListController } from "./AdvertisementListController.js"



domContentLoadedListener(() => {
    const advertisementsListElement = document.querySelector('.addvertisementList');
    const adListController = new AdvertisementListController(advertisementsListElement);
    adListController.displayAdvertisments();
})