import { userService } from "../services/UserService.js";
export class HeaderController {
    constructor(headerListElement) {
        this.headerListElement = headerListElement;
    }

    displayListElementsByCurrentView() {
        const insideLoginView = this.checkViewByPathName('login');
        const insideSignupView = this.checkViewByPathName('signup');
        const insideCreateAdvertisementView = this.checkViewByPathName('createadvertisement');
        const loginLinkElement = this.createListItemWithLinkElement('/login.html', 'Iniciar sesión');
        const signupLinkElement = this.createListItemWithLinkElement('/signUp.html', 'Registrarse');
        const createAdvertisementLinkElement = this.createListItemWithLinkElement('/createAdvertisement.html', 'Crear anuncio');
        const userIsLogged = userService.getLoggedUser();
        if (!userIsLogged) {
            this.manageNotLoggedLinks(insideSignupView, signupLinkElement, insideLoginView, loginLinkElement);
        } else {
            const logoutLinkElement = this.createListItemWithLinkElement('#', 'Cerrar sesión');
            this.manageLogoutLinkEvent(logoutLinkElement);
            this.headerListElement.appendChild(logoutLinkElement);
            if (!insideCreateAdvertisementView) {
                this.headerListElement.appendChild(createAdvertisementLinkElement);
            }

        }
    }

    manageNotLoggedLinks(insideSignupView, signupLinkElement, insideLoginView, loginLinkElement) {
        if (!insideSignupView) {
            this.headerListElement.appendChild(signupLinkElement);
        }
        if (!insideLoginView) {
            this.headerListElement.appendChild(loginLinkElement);
        }
    }

    checkViewByPathName(pathName) {
        return location.pathname.toLocaleLowerCase().includes(pathName);
    }

    createListItemWithLinkElement(linkTo, anchorText) {
        const listItemElement = document.createElement('li');
        const anchorElement = document.createElement('a');
        anchorElement.setAttribute('href', linkTo);
        anchorElement.text = anchorText;
        listItemElement.appendChild(anchorElement);
        return listItemElement;
    }

    manageLogoutLinkEvent(logoutLinkElement) {
        logoutLinkElement.addEventListener("click", ($event) => {
            $event.preventDefault();
            userService.removeUserToken();
            location.href = '/';
        });
    }
}