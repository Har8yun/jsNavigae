'use strict';

import Helper from '../helpers/helper.js';

class Route {
    constructor(name, defaultRoute = false) {
        try {
            if (!name) {
                throw 'error: name  and htmlName are required';
            }

            this.name = Helper.capitalize(name);
            this.default = defaultRoute;

        } catch (e) {
            console.log(e);
        }
    }
    
    // Check if route exists.
    isActiveRoute(hashedPath) {
        return Helper.capitalize(hashedPath.replace('#', '')) === this.name;
    }
}

export default Route;