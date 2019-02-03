/*vanilla js template*/

import Component from '../origin/component.js';

const containerId = 'users-list';
const searchInputId = "searchFor";
const paginateId = "paginate-container";
const paginatorButtonsClass = "paginator-button";

class UsersComponent extends Component {

	constructor(searchValue = "") {
		super(searchValue);		
		
		this.searchInputId = searchInputId;
		this.paginatorButtonsClass = paginatorButtonsClass;
		this.searchValue = searchValue;
		this.rootElem.innerHTML = this.init();
	}

	get container() {
		return document.getElementById(containerId);
	}

	get containerPaginator() {
		return document.getElementById(paginateId);
	}

	render(users) {
		let usersHtml = '';

        if (users.length) {
            usersHtml = users.map((user, /*index, arr*/) => {
                return this.userTile(user);
            }).join('');
        }

        if(this.searchValue && !users.length) {
			usersHtml = this.noUsers;
        }

        this.container.innerHTML = usersHtml;
	}

	renderPagination(total, currentPage, lastPage) {
		this.containerPaginator.innerHTML = this.paginator(total, currentPage, lastPage);
	}

	init() {
		return (
			`<div class="users">
			    <div id="search-container">
			        <input id="${searchInputId}" value="${this.searchValue}" type="search" placeholder="Search for users" >
			    </div>
			    <div id="${paginateId}"></div>
			    <div id="${containerId}"></div>
			</div>`
		)
	}

    userTile(user) {
        return (
            `<a class="user-tile" href="#singleUser/${user.id}">
                <div class="user-avatar">
                    <img class="user-avatar-img" src="${user.avatar_url}" alt="${user.login}">
                </div>
                <div class="user-name"><p>${user.login}</p></div>
            </a>`
        )
    }

    get noUsers() {
    	return(`<h4 class="white text-center">No Result</h4>`)
    }

    paginator(total=0, currentPage=1, lastPage) {
    	return(
    		`<div class="paginator">
    			${total ? `<span class="button small info">Total: ${total}</span>` : ''}
				<button data-action="prev" class="paginator-button button small left" ${currentPage ===1 ? 'disabled="disabled"' : ''}>Prev</button>
				<button data-action="next" class="paginator-button button small fight" ${currentPage ===lastPage ? 'disabled="disabled"' : ''}>Next</button>
    		</div>`
		)
    }
}

export default UsersComponent;