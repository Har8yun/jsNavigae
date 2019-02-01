'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('users', 'users.html', true),
            new Route('repositories', 'repositories.html', true)
        ]);
    }
    init();
})();

console.log('app')