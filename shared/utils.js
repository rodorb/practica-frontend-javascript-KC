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

export function onAnyInputChanges(formNodeElement) {
    if (formNodeElement) {
        const inputElements = Array.from(formNodeElement.querySelectorAll('input'));
        inputElements.forEach((input) => {
            input.addEventListener('input', () => {
                checkIfAllInputsAreFilled(inputElements, formNodeElement)
            });
        });
    }
}

function checkIfAllInputsAreFilled(inputElements, formNodeElement) {
    const areAllInputsFilled = inputElements.every((inputElement) => inputElement.value);
    const buttonElement = formNodeElement.querySelector("button");
    if (areAllInputsFilled) {
        buttonElement.removeAttribute("disabled");
    } else {
        buttonElement.setAttribute("disabled", "");
    }
}