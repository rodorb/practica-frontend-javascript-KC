export function domContentLoadedListener(callbackFn) {
    document.addEventListener('DOMContentLoaded', callbackFn())
}