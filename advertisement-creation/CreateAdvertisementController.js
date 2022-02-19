import AdvertisementService from "../shared/services/AdvertisementService.js";
import { userService } from "../shared/services/UserService.js";
import { decodeToken } from "../shared/utils/decodeToken.js";
import { onAnyFormElementChanges, publishErrorNotification, publishSuccessNotification } from "../shared/utils/utils.js";

export class CreateAdvertisementController {
    constructor(createAdvertismentFormElement) {
        this.createAdvertismentFormElement = createAdvertismentFormElement;
        this.checkIfUserIsLogged();

    }

    checkIfUserIsLogged() {
        const loggedUserToken = userService.getLoggedUser();
        const userLoggedOk = decodeToken(loggedUserToken);
        if (userLoggedOk) {
            this.subscribeToEvents();
        } else {
            this.createAdvertismentFormElement.innerHTML = "";
            publishErrorNotification(
                'No estás logeado, se te redirigirá a la página pincipal',
                () => { location.href = '/' })
        }
    }

    subscribeToEvents() {
        onAnyFormElementChanges(this.createAdvertismentFormElement);
        this.subscribeToSubmitEvent();
    }

    subscribeToSubmitEvent() {
        this.createAdvertismentFormElement.addEventListener("submit", ($event) => {
            $event.preventDefault();
            const body = this.buildBody();
            this.createAdvertisement(body);
        });
    }

    buildBody() {
        const forSale = this.createAdvertismentFormElement.querySelector('select').value === 'venta';
        const formData = new FormData(this.createAdvertismentFormElement);
        return {
            photo: formData.get('image') || "https://www.apconetforum.org/eweb/images/DEMO1/notavailable.jpg",
            name: formData.get('productName'),
            description: formData.get('shortDescription'),
            longDescription: formData.get('longDescription'),
            price: formData.get('price'),
            forSale: forSale,
            priceUnit: "€"
        }
    }

    async createAdvertisement(body) {
        try {
            await AdvertisementService.createAdvertisment(body);
            publishSuccessNotification('Anuncio creado correctamente', () => { location.href = '/' });
        } catch (error) {
            publishErrorNotification(error)
        }
    }
}