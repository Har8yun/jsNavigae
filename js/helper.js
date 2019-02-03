'use strict';

// Controllers - make dynamic
import Users from './users.js';
import SingleUser from './singleUser.js';
import Repositories from './repositories.js';

// Components - make dynamic
import SingleUsersComponent from '../components/singleUser.js';
import RepositoriesComponent from '../components/repositories.js';
import UsersComponent from '../components/users.js';

import { API_URL, API_URL_SEARCH_USERS, API_NAME_PARAM, API_PAGE_PARAM, API_PER_PAGE_PARAM, USERS_PER_PAGE } from '../constants/api.js';

class Helper {

    static makePage(pageName, params) {
        
        let controller = Helper.getControllerType(pageName);
        //make instance of page
        new controller(pageName, params);

        // let component = Helper.getComponentType(`${pageName}`);
        // new component(pageName, params);

        //todo move to controller
        Helper.addEvent();
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

    static getComponentType(string) {
        const c = 'Component';
        /*todo make dynamic*/
        // Call component
        switch (`${string}${c}`) {
            case 'UsersComponent':
                return UsersComponent;
            case 'SingleUserComponent':
                return SingleUserComponent;
            case 'RepositoriesComponent':
                return RepositoriesComponent;   
        }
    }

    //todo - make dynamic Requester;
    static sendRequest(url = API_URL, type='GET', params = null, async = true, responseType = 'json' ) {
        let xhttp = new XMLHttpRequest();
        xhttp.open(type, url, async);
        xhttp.responseType = responseType;
        xhttp.onreadystatechange = (...a) => {
            if(xhttp.readyState === 4 && xhttp.status === 200) {
                // response {items:[],total_count:number,incomplete_results:boolean}
                Users.show(xhttp.response.items, true);
            }
        };

        xhttp.send();
    }

    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }


    /*todo- make event part */
    static addEvent(selector = "#searchFor") {
        let el = document.querySelector(selector);

        if (el) {
            el.addEventListener("keyup", (event) => {
                event.preventDefault();

                if (event.which !== 13) {
                    return;
                }

                let searchValue = event.target.value;
                if (searchValue.length > 0) {
                    // https://api.github.com/search/users?per_page=42&page=1&q=blablabla
                    let url = `${API_URL_SEARCH_USERS}${API_PER_PAGE_PARAM}=${USERS_PER_PAGE}&${API_PAGE_PARAM}=1&${API_NAME_PARAM}=${searchValue}`;
                    Helper.sendRequest(url);
                }
            })
        }
    }
}

export default Helper;
