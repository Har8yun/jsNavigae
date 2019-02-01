'use strict';

function Router(routes){
    try{

        if (!routes) {
            throw 'error: routes is required';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.log(e);
    }

}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,

    constructor(routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },

    init() {
        var r = this.routes;

        (function(scope, r) {
            debugger
            window.addEventListener('hashchange', function (e) {
                debugger
                scope.hashChanged(scope, r);
            })
        })(this, r);

        this.hashChanged(this, r);

    },

    hashChanged(scope, r) {
        if (window.location.hash.length > 0) {
            for(let i=0, length = r.length; i < length; i++){
                let route = r[i];
                if (route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
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
    },

    goToRoute(htmlName) {
        (function (scope) {
            var url = `views/${htmlName}`;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if(this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this)
    }


    // isActiveRoute(hashedPath) {
    //     return hashedPath.replace('#', '') === this.name;
    // }
};

console.log('rr')