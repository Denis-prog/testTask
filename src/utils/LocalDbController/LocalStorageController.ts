import LocalDbController from "./LocalDbController";

export class LocalStorageController implements LocalDbController {
    getData<T, F = null, Key = string>(key: Key, fallback: F) {
        try {
            const data = localStorage.getItem(`${key}`);

            if (data == null) {
                return fallback;
            }

            return JSON.parse(data) as T;
        } catch (e) {
            return fallback
        }
    }

    clearData<Key = string>(key: Key) {
        localStorage.removeItem(`${key}`);
    }


    clearAllData() {
        localStorage.clear();
    }


    setData<T, Key = string>(data: T, key: Key) {

        localStorage.setItem(`${key}`, JSON.stringify(data))

    }
}

export default new LocalStorageController();
