'use strict';

import Router from '../router/router.js';
import Route from '../router/route.js';

(function () {
    function init() {
        new Router([
            new Route('users', true),
            new Route('singleUser'),
            new Route('repositories'),
            //todo!!!
            new Route('notfound') 
        ]);
    }
    init();
})();