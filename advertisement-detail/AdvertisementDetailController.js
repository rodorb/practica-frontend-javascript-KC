import AdvertisementService from "../shared/services/AdvertisementService.js";
import { userService } from "../shared/services/UserService.js";
import { decodeToken } from "../shared/utils/decodeToken.js";
import { displaySpinner, publishErrorNotification, removeSpinner } from "../shared/utils/utils.js";
import { buildAdvertisementDetailView } from "./AdvertisementDetailView.js";

export class AdvertisementDetailController {
    constructor(advertisementDetailElement) {
        this.advertisementDetailElement = advertisementDetailElement;
        this.advertisement = null;
    }

    async displayAdvertisementDetail(id) {
        if (!id) {
            publishErrorNotification("Id de anuncio no válido", () => { location.href = '/' });
            return;
        }
        displaySpinner(this.advertisementDetailElement);
        try {
            this.advertisement = await AdvertisementService.getAdvertisement(id);
            const advertisementTpl = buildAdvertisementDetailView(this.advertisement);
            const advertisementElement = document.createElement('div');
            advertisementElement.innerHTML = advertisementTpl;
            this.advertisementDetailElement.appendChild(advertisementElement);
            this.handleDeleteButton();
        } catch (error) {
            publishErrorNotification(error, () => { location.href = '/'; });
        } finally {
            removeSpinner(this.advertisementDetailElement);
        }

    }


    handleDeleteButton() {
        const loggedUserToken = userService.getLoggedUser();

        if (loggedUserToken) {
            // decodificamos token
            const userInfo = decodeToken(loggedUserToken);

            // comprobamos si el id de usuario logado es el mismo que el id del creador del anuncio
            const isOwner = this.isAdOwner(userInfo.userId);
            // pintamos botón
            if (isOwner) {
                this.drawDeleteButton();
            }
        }
    }

    isAdOwner(userId) {
        return userId === this.advertisement.userId;
    }

    drawDeleteButton() {
        const buttonElement = document.createElement("button");
        buttonElement.textContent = "Borrar Anuncio";
        buttonElement.classList.add("submit-btn");
        this.advertisementDetailElement.appendChild(buttonElement);

        buttonElement.addEventListener("click", () => {
            this.deleteAd();
        });
    }

    async deleteAd() {
        const shouldDelete = window.confirm("Estás seguro de borrar el anuncio?");

        if (shouldDelete) {
            try {
                await AdvertisementService.deleteAdvertisement(this.advertisement.id);
                window.location.href = "/";
            } catch (error) {
                publishErrorNotification(error)
            }
        }
    }
}