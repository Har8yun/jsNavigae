'use strict';

import Helper from '../helpers/helper.js';

class Router {

    constructor(routes) {

        try{
            if (!routes) {
                throw 'error: routes is required';
            }

            this.routes = routes;
            this.hashChangedListener()

        } catch (e) {
            console.log(e);
        }
    }

    hashChangedListener() {
        window.addEventListener('hashchange', () => { this.hashChanged(this, this.routes) });
            this.hashChanged(this, this.routes);
    }

    hashChanged(scope, r) {
        let windowHash = window.location.hash;
        let [hashName, hashParams] = windowHash
            .substr(1)
            .split('/');

        let currentRoute;

        if (windowHash.length > 0) {
            currentRoute = r.find(item => item.isActiveRoute(hashName));
        } else {
            // Go to home route
            currentRoute = r.find(item => item.default === true);
        }

        if (currentRoute) {
            scope.goToRoute(currentRoute.name,  hashParams);
        }
        else {
            /*todo - make not found route*/
            alert('You are lost!')
        }
    }

    goToRoute(className, params) {
        Helper.makePage(className, params);
    }
}

export default Router;