import { domContentLoadedListener } from "../domEventListeners.js";
import { HeaderController } from "./HeaderController.js";

domContentLoadedListener(() => {
    const headerListElement = document.querySelector('header ul');
    const headerController = new HeaderController(headerListElement);
    headerController.displayListElementsByCurrentView();
})