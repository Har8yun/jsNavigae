'use strict';

class Route {
    constructor(name, htmlName, defaultRoute) {
        try{
            if (!name || !htmlName) {
                throw 'error: name  and htmlName are required';
            }

            this.name = name;
            this.htmlName = htmlName;
            this.default = defaultRoute;

        } catch (e) {
            console.log(e);
        }
    }

    isActiveRoute(hashedPath) {
        return hashedPath.replace('#', '') === this.name;
    }
}

export default Route;