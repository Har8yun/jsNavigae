//todo - make paginate;
import Controller from '../origin/controller.js'
import Store from '../store/store.js';
import UsersComponent from '../components/users.js';

import { API_URL, API_URL_SEARCH_USERS, API_NAME_PARAM, API_PAGE_PARAM, API_PER_PAGE_PARAM, USERS_PER_PAGE } from '../constants/api.js';

class Users extends Controller {

    constructor(...props) {
        super(...props);

        this.currentPage = 1;
        let rememberedPage = Number(Store.getKey('currentPage', false, false));
        if (rememberedPage) {
            this.currentPage = rememberedPage;
        }

        let rememberedSearchValue = Store.getKey('searchValue', false, false);
        if (rememberedSearchValue) {
            this.searchValue = rememberedSearchValue;
        }
        
        this.show();
    }

    show(users) {

        //save in local storage
        if(users && Store.isOk()) {
            Store.save('users', JSON.stringify(users));
            Store.save('totalCount', this.totalCount);
            Store.save('currentPage', this.currentPage);
        }

        if(!users) {
            users = Store.getKey('users');
            this.totalCount = Store.getKey('totalCount');
        }

        // Draw component
        let value = this.searchValue ? this.searchValue : "";
        let component = new UsersComponent(value);
        if (users) {
            component.render(users);
        }
        // Add event listener.
        this.addEvent(component.searchInputId, this.searchUsersHandler.bind(this), "id", "keyup");

        if (users && users.length) {
            //todo Make pagination
            let lastPage = Math.ceil(this.totalCount/USERS_PER_PAGE)
            component.renderPagination(this.totalCount, this.currentPage, lastPage);
            this.addEvent(component.paginatorButtonsClass, this.paginateHandler.bind(this));
        }
    }

    paginateHandler(event) {
        let action = event.target.dataset['action'];
        let currentPage = this.currentPage;

        switch(action) {
            case 'next':
                currentPage++;
                break;
            case 'prev':
                currentPage--;
                break;
        }

        this.currentPage = currentPage;
        this.prepareSendUrl();
    }

    searchUsersHandler(event) {
        event.preventDefault();

        if (event.which !== 13) {
            return;
        }

        let searchValue = event.target.value;
        if (searchValue !== this.searchValue) {
            // Reset pagination for new search
            this.currentPage = 1;
        }
        this.searchValue = searchValue;
        Store.save('searchValue', searchValue);

        if (searchValue.length > 0) {
            this.prepareSendUrl()
        }
    }

    prepareSendUrl() {
                //Paginate
        let page = this.currentPage;
        let searchValue = this.searchValue;

        // https://api.github.com/search/users?per_page=42&page=1&q=blablabla
        let url = `${API_URL_SEARCH_USERS}${API_PER_PAGE_PARAM}=${USERS_PER_PAGE}&${API_PAGE_PARAM}=${page}&${API_NAME_PARAM}=${searchValue}`;
        this.sendRequest(url);
    }

    //todo - make dynamic Requester;
    sendRequest(url = API_URL, type='GET', params = null, async = true, responseType = 'json' ) {
        let xhttp = new XMLHttpRequest();
        xhttp.open(type, url, async);
        xhttp.responseType = responseType;
        xhttp.onreadystatechange = (...a) => {
            if(xhttp.readyState === 4 && xhttp.status === 200) {
                // response {items:[],total_count:number,incomplete_results:boolean}
                this.totalCount = xhttp.response.total_count;
                this.show(xhttp.response.items);

            }
        };
        xhttp.send();
    }

    addEvent(selector, callBack, qtype="class", eventName="click") {
        let el;
        if (qtype === 'class') {
            el = document.getElementsByClassName(selector)
        } else {
            el = document.getElementById(selector);
        }

        if (el) {
            if (el.length) {
                for (let item of el) {
                    item.addEventListener(eventName, callBack)
                }
            } else {
                el.addEventListener(eventName, callBack)
            }
        }
    }

}

export default Users;