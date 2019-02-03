'use strict';

/*todo - make import dynamic*/
import Users from '../controllers/users.js';
import SingleUser from '../controllers/singleUser.js';
import Repositories from '../controllers/repositories.js';

class Helper {
    static makePage(pageName, params) {
        let controller = Helper.getControllerType(pageName);
        //make instance of page
        new controller(pageName, params);
    }

    static getControllerType(string) {
        switch (string) {
            case 'Users':
                return Users;
            case 'SingleUser':
                return SingleUser;
            case 'Repositories':
                return Repositories;   
        }
    }

    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
}

export default Helper;