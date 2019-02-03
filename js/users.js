//todo - make paginate;

import Controller from '../origin/controller.js'
import Store from '../store/store.js';
// import { USERS_PER_PAGE } from '../constants/api.js';
import UsersComponent from '../components/users.js';


class Users extends Controller {

    constructor(...props) {
        super(...props);

        Users.show();
    }

    static show(users, draw = false) {

        //save in local storage
        if(users && Store.isOk()) {
            Store.save('users', JSON.stringify(users));
        }

        if(!users) {
            users = Store.getKey('users');
        }

        // if (draw) {
            // Draw component
            new UsersComponent().render(users);
        // }
       
    }
}

export default Users;