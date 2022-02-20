import AdvertisementService from "../shared/services/AdvertisementService.js";
import { displaySpinner, publishErrorNotification, removeSpinner } from "../shared/utils/utils.js";
import { buildAdvertisementView } from "./AdvertisementView.js";

export class AdvertisementListController {
    constructor(advertisementsElement) {
        this.advertisementsElement = advertisementsElement;
    }

    async displayAdvertisments() {
        displaySpinner(this.advertisementsElement);
        try {
            const advertisementsList = await AdvertisementService.getAdvertisements();
            if (advertisementsList.length > 0) {
                advertisementsList.forEach((advertisement) => {
                    const advertisementDivElement = document.createElement('div');
                    const advertisementTemplate = buildAdvertisementView(advertisement);
                    advertisementDivElement.innerHTML = advertisementTemplate;
                    advertisementDivElement.classList.add("advertisement-container");
                    this.advertisementsElement.appendChild(advertisementDivElement);
                });
            } else {
                const noContentElement = document.createElement('p');
                noContentElement.classList.add('no-data');
                noContentElement.textContent = 'No existen anuncios disponibles...';
                this.advertisementsElement.appendChild(noContentElement);
            }
        } catch (error) {
            publishErrorNotification('Se ha producido un error al recuperar anuncios.');
        } finally {
            removeSpinner(this.advertisementsElement);
        }
    }

}