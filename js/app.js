'use strict';

import Router from './router.js';
import Route from './route.js';

(function () {
    function init() {
        new Router([
            new Route('users', true),
            new Route('singleUser'),
            new Route('repositories'),
            new Route('notfound') //todo!!!
        ]);
    }
    init();
})();