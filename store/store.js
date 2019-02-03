class Store {

    static isOk() {
        return typeof localStorage !== 'undefined';
    }

    static save(key, value) {
        if (!Store.isOk()) {
            return false;
        }

        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }

        localStorage.setItem(key, value);
        return true;
    }

    static getKey(key, id=false, parse = true) {
        if (!Store.isOk()) {
            return false;
        }
        
        let keyObject =localStorage.getItem(key);
        if (parse) {
            keyObject = JSON.parse(keyObject);
        }

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