import { transformAdvertisement } from "../responseTransformers/AdvertisementTransformer.js";
import { ENDPOINTS } from "./apiUrls.js";

class AdvertisementService {
    constructor() {}

    async getAdvertisements() {
        let httpResponse;
        let advertisements;
        try {
            httpResponse = await fetch(ENDPOINTS.advertisementAPI);
        } catch (error) {
            throw new Error("ERROR IN HTTP REQUEST");
        }

        if (!httpResponse.ok) {
            throw new Error(`Anuncios no encontrados. Status => ${httpResponse.status}`);
        }

        try {
            advertisements = await httpResponse.json();
        } catch (error) {
            throw new Error("ERROR FORMATTING TO JSON");
        }

        const transfromedAdvertisements = advertisements.map(transformAdvertisement);
        return transfromedAdvertisements;

    }

    async getAdvertisement(id) {
        let httpResponse;
        let advertisement;
        try {
            httpResponse = await fetch(`${ENDPOINTS.advertisementAPI}/${id}`);
        } catch (error) {
            throw new Error("ERROR IN HTTP REQUEST");
        }

        if (!httpResponse.ok) {
            throw new Error(`Anuncio no encontrado. Status => ${httpResponse.status}`);
        }

        try {
            advertisement = await httpResponse.json();
        } catch (error) {
            throw new Error("ERROR FORMATTING TO JSON");
        }

        const transfromedAdvertisement = transformAdvertisement(advertisement);
        return transfromedAdvertisement;
    }

    async createAdvertisment(body) {

    }

}

export default new AdvertisementService();