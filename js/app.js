'use strict';

import Router from './router.js';
import Route from './route.js';

(function () {
    function init() {
        new Router([
            new Route('users', 'users.html', true),
            new Route('singleUser', 'singleUser.html'),
            new Route('repositories', 'repositories.html')
        ]);
    }
    init();
})();