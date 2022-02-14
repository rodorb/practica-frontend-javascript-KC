import { pubSub } from "./pubSub.js";
import { buildSpinnerView } from "./spinner/SpinnerView.js";

export function publishErrorNotification(message) {
    pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        message);
}

export function displaySpinner(nodeElement) {
    const spinnerTemplate = buildSpinnerView();
    nodeElement.innerHTML = spinnerTemplate;
}

export function removeSpinner(nodeElement) {
    const loader = nodeElement.querySelector(".loader");
    loader.remove();
}