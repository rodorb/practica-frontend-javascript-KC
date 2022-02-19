import { pubSub } from "../pubSub.js";
import { buildSpinnerView } from "../spinner/SpinnerView.js";

export function publishErrorNotification(message, callbackFn = null) {
    pubSub.publish(
        pubSub.TOPICS.SHOW_ERROR_NOTIFICATION,
        message,
        callbackFn);
}

export function publishSuccessNotification(message, callbackFn = null) {
    pubSub.publish(
        pubSub.TOPICS.SHOW_SUCCESS_NOTIFICATION,
        message,
        callbackFn);
}

export function displaySpinner(nodeElement) {
    const spinnerTemplate = buildSpinnerView();
    const spinnerElement = document.createElement('div');
    spinnerElement.innerHTML = spinnerTemplate;
    nodeElement.appendChild(spinnerElement);
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


export function onAnyFormElementChanges(formNodeElement) {
    if (formNodeElement) {
        const formElementsToCheck = Array.from(formNodeElement.elements).filter(e => e.labels && e.nodeName !== 'BUTTON');
        const buttonElement = formNodeElement.querySelector("button");
        formElementsToCheck.forEach((formElement) => {
            formElement.addEventListener('input', () => {
                const isFormValid = formNodeElement.checkValidity();
                if (isFormValid) {
                    buttonElement.removeAttribute("disabled");
                } else {
                    buttonElement.setAttribute("disabled", "");
                }
            });
        });
    }
}