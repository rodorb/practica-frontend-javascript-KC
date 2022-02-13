import AdvertisementService from "../shared/services/AdvertisementService.js";

export class AdvertisementListController {
    constructor(advertisementsElement) {
        this.advertisementsElement = advertisementsElement;
    }

    async displayAdvertisments() {
        try {
            const advertisementsList = await AdvertisementService.getAdvertisements();
            console.log(advertisementsList);
        } catch (error) {
            //TODO: implementar pubsub
        }
    }
}