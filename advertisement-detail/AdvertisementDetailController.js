import AdvertisementService from "../shared/services/AdvertisementService.js";
import { displaySpinner, publishErrorNotification, removeSpinner } from "../shared/utils.js";
import { buildAdvertisementDetailView } from "./AdvertisementDetailView.js";

export class AdvertisementDetailController {
    constructor(advertisementDetailElement) {
        this.advertisementDetailElement = advertisementDetailElement;
    }

    async displayAdvertisementDetail(id) {
        if (!id) {
            publishErrorNotification("Id de anuncio no válido");
            return;
        }
        displaySpinner(this.advertisementDetailElement);
        try {
            const advertisement = await AdvertisementService.getAdvertisement(id);
            const advertisementTpl = buildAdvertisementDetailView(advertisement);
            const advertisementElement = document.createElement('div');
            advertisementElement.innerHTML = advertisementTpl;
            this.advertisementDetailElement.appendChild(advertisementElement);
        } catch (error) {
            publishErrorNotification(error);
        } finally {
            removeSpinner(this.advertisementDetailElement);
        }

    }
}