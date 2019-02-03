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

    static getKey(key, id) {
        if (!Store.isOk()) {
            return false;
        }

        let keyObject = JSON.parse( localStorage.getItem(key) )

        if (!id) {
            return keyObject;
        }

        return keyObject.find(it => it.id === id)
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