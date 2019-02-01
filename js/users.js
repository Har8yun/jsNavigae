//todo - make paginate;
import { USERS_PER_PAGE } from './constants.js';

import Store from './store.js';

class Users {

    constructor() {
        Users.showUsersList();
    }

    static showUsersList(users) {

        //save in local storage
        if(users && Store.isOk()) {
            Store.save('users', JSON.stringify(users));
        }

        if(!users) {
            users = Store.getKey('users');
        }

        let userHtml = users.map((user, /*index, arr*/) => {
            return Users.userTile(user);
        }).join('');

        document.getElementById('users-list').innerHTML = userHtml;
    }

    //vanilla js template
    static userTile(user) {
        return (
            `<a class="user-tile" href="#singleUser/${user.id}">
                <div class="user-avatar">
                    <img class="user-avatar-img" src="${user.avatar_url}" alt="${user.login}">
                </div>
                <div class="user-name"><p>${user.login}</p></div>
            </a>`
        )
    }
}

export default Users;