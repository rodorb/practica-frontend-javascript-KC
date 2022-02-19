export function getSessionStorageParsedItem(itemName) {
    const parsedItem = parseStorageItem(sessionStorage.getItem(itemName));
    return parsedItem;
}

export function getLocalStorageParsedItem(itemName) {
    const parsedItem = parseStorageItem(localStorage.getItem(itemName));
    return parsedItem;
}


export function setSessionStorageParsedItem(itemName, itemValue) {
    sessionStorage.setItem(itemName, typeof itemValue === 'string' ? itemValue : JSON.stringify(itemValue));
}

export function setLocalStorageParsedItem(itemName, itemValue) {
    localStorage.setItem(itemName, typeof itemValue === 'string' ? itemValue : JSON.stringify(itemValue));
}

function parseStorageItem(item) {
    let result = null;
    if (item && typeof item === 'string') {
        const itemFirstChar = item[0];
        const itemLastChar = item[item.length - 1];
        const needsParse = (itemFirstChar === "{" && itemLastChar === "}") || (itemFirstChar === "[" && itemLastChar === "]");
        result = needsParse ? JSON.parse(item) : item;
    }

    return result;
}