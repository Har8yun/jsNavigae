'use strict';

import Helper from './helper.js';

class Router {

    constructor(routes) {

        try{
            if (!routes) {
                throw 'error: routes is required';
            }

            this.routes = routes;
            this.rootElem = document.getElementById('app');
            window.addEventListener('hashchange', () => { this.hashChanged(this, routes) });
            this.hashChanged(this, routes);

        } catch (e) {
            console.log(e);
        }
    }

    hashChanged(scope, r) {
        if (window.location.hash.length > 0) {
            for(let i=0, length = r.length; i < length; i++){
                let route = r[i];
                let [hashName, hashParams] = window.location.hash
                    .substr(1)
                    .split('/');

                if (route.isActiveRoute(hashName)) {
                    scope.goToRoute(route.htmlName, Helper.capitalize(hashName),  hashParams);
                }
            }
        } else {
            for(let i=0, length = r.length; i < length; i++){
                let route = r[i];
                if (route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    }

    goToRoute(htmlName, className, params) {
        const url = `views/${htmlName}`;

        // XMLHttpRequest may be done by fetch.
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState === 4 && xhttp.status === 200) {
                this.rootElem.innerHTML = xhttp.responseText;

                Helper.makePage(className);

                // this.addEvent();
            }
        };
        xhttp.send();
    }

}

export default Router;