import Component from '../origin/component.js';

const containerId = 'single-user';
const userInfoContainer = 'user-info-container';

class SingleUserComponent extends Component {

	constructor(...props) {
		super(...props);		
		this.rootElem.innerHTML = this.init();
	}

	get container() {
		return document.getElementById(containerId);
	}

	get userInfoContainer() {
		return document.getElementById(userInfoContainer);
	}

	render(user) {
		let userHtml = user 
			? this.SingleUserTile(user)
			: this.noSuchUser();

        this.userInfoContainer.innerHTML = userHtml;
	}

	init() {
		return(
			`<div id="${containerId}">
			    <a href="#users" class="go-back">go back to Users</a>
			    <div id="${userInfoContainer}">
			    </div>
			</div>`
		)
	}

    SingleUserTile(user) {
    	return(
			`<div class="user-tile">
				<div class="">
					<div class="user-avatar">
	                    <img class="user-avatar-img" src="${user.avatar_url}" alt="${user.login}">
	                </div>
	                <div class="user-name"><p>${user.login}</p></div>
				</div>
				<div class="user-information">
					<h3>User INformation goes here!</h3>
				</div>
			</div>`
		)
    }

    noSuchUser() {
    	return(
			`<h2>No SUch User</h2>`
		)
    }
}

export default SingleUserComponent;