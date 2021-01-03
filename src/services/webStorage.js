const WEB_STORAGE_APP_KEY = 'plagiarism-detector';

export const getAppStorage = () =>
    JSON.parse(localStorage[WEB_STORAGE_APP_KEY] || '{}');

export const setAppStorage = (value) => {
    localStorage.setItem(WEB_STORAGE_APP_KEY, JSON.stringify(value));
}

export const getItem = (key) => {
    const data = getAppStorage();
    return Object.prototype.hasOwnProperty.call(data, key)
        ? data[key]
        : undefined;
};

export const setItem = (key, value) => {
    setAppStorage({...getAppStorage(), [key]: value});
};

export const deleteItem = (key) => {
    const data = getAppStorage();
    delete data[key];
    setAppStorage(data);
};

export default {
    getAppStorage,
    setAppStorage,
    getItem,
    setItem,
    deleteItem
};
