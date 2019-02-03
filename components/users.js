/*vanilla js template*/

import Component from '../origin/component.js';

const containerId = 'users-list';

class UsersComponent extends Component {

	constructor(...props) {
		super(...props);		
		
		this.rootElem.innerHTML = this.init();
	}

	get container() {
		return document.getElementById(containerId);
	}

	render(users) {
		let usersHtml = '';

        if (users) {
            usersHtml = users.map((user, /*index, arr*/) => {
                return this.userTile(user);
            }).join('');
        }

        this.container.innerHTML = usersHtml;
	}

	init() {
		return (
			`<div class="users">
			    <div id="search-container">
			        <input id="searchFor" type="search" placeholder="Search for users" >
			    </div>

			    <div id="users-list"></div>
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
}

export default UsersComponent;