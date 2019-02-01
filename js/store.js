class Store {

    static isOk() {
        return typeof localStorage !== 'undefined';
    }

    static save(key, value) {
        if (!Store.isOk()) {
            return false;
        }

        localStorage.setItem(key, value);
        return true;
    }

    static getKey(key) {
        if (!Store.isOk()) {
            return false;
        }

        return JSON.parse( localStorage.getItem(key) );
    }

    static remove(key) {
        if (!Store.isOk()) {
            return false;
        }

        localStorage.removeItem(key);
        return true;
    }
}

export default Store;