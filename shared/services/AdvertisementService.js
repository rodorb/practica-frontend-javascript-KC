import { transformAdvertisement } from "../responseTransformers/AdvertisementTransformer.js";
import { ENDPOINTS } from "./apiUrls.js";
import { userService } from "./UserService.js";

class AdvertisementService {
    METHODS = {
        POST: 'POST',
        DELETE: 'DELETE'
    }
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
        let response;
        try {
            response = await fetch(ENDPOINTS.advertisementAPI, {
                method: this.METHODS.POST,
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userService.getLoggedUser()}`,
                },
            });
        } catch (error) {
            throw new Error("No se ha podido crear el anuncio");
        }

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
    }

    async deleteAdvertisement(id) {
        let response;
        try {
            response = await fetch(`${ENDPOINTS.advertisementAPI}/${id}`, {
                method: this.METHODS.DELETE,
                headers: {
                    "Authorization": `Bearer ${userService.getLoggedUser()}`,
                },
            });
        } catch (error) {
            throw new Error("No se ha podido borrar el anuncio");
        }

        if (!response.ok) {
            throw new Error("Anuncio no encontrado");
        }
    }

}

export default new AdvertisementService();