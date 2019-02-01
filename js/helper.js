'use strict';

import Users from './users.js';
import SingleUser from './singleUser.js';
import { API_URL, API_URL_USERS } from './constants.js';

class Helper {

    static makePage(pageName) {
        let pageType = Helper.getPageType(pageName);
        //make instance of page
        new pageType();

        Helper.addEvent();
    }

    static getPageType(string) {
        switch (string) {
            case 'Users':
                return Users;
            case 'SingleUser':
                return SingleUser;
        }
    }

    //todo - make dynamic;
    static sendRequest(url = API_URL, type='GET', params = null, async = true, responseType = 'json' ) {
        let xhttp = new XMLHttpRequest();
        xhttp.open(type, url, async);
        xhttp.responseType = responseType;
        xhttp.onreadystatechange = (...a) => {
            if(xhttp.readyState === 4 && xhttp.status === 200) {
                Users.showUsersList(xhttp.response);
            }
        };

        xhttp.send();
    }

    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    static addEvent() {
        let input = document.querySelector('#searchFor');

        if (input) {
            input.addEventListener("keyup", (event) => {
                event.preventDefault();

                if (event.which !== 13) {
                    return;
                }

                let searchValue = event.target.value;
                if (searchValue.length > 0) {
                    let url = `${API_URL_USERS}?${searchValue}`;
                    Helper.sendRequest(url);
                }
            })
        }
    }
}

export default Helper;
