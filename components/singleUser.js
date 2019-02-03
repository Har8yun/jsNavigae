import Component from '../origin/component.js';

const containerId = 'single-user';
const userInfoContainer = 'user-info-container';
const userRepoInfoContainerId = 'user-repo-information';

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

	get repoInofoContainer() {
		return document.getElementById(userRepoInfoContainerId)
	}

	render(user) {
		let userHtml = user 
			? this.SingleUserTile(user)
			: this.noSuchUser();

        this.userInfoContainer.innerHTML = userHtml;
	}

	renderRepos(userRepos) {
		let repoHtml = '';
		
		if (userRepos.length === 0) {
			repoHtml = this.noRepos();
		} else {
			repoHtml = userRepos.map(repo => {
				return this.repoTile(repo);
			}).join('');			
		}

		this.repoInofoContainer.innerHTML = repoHtml;
	}

	init() {
		return(
			`<div id="${containerId}">
			    <a href="#users" class="button go-back">Back to Users</a>
			    <div id="${userInfoContainer}">
			    </div>
			</div>`
		)
	}

    SingleUserTile(user) {
    	return(
			`<div>
				<div class="user-tile">
					<div class="user-avatar">
	                    <img class="user-avatar-img" src="${user.avatar_url}" alt="${user.login}">
	                </div>
	                <div class="user-name"><p>${user.login}</p></div>
				</div>
				<div id="${userRepoInfoContainerId}">
					<h3 class="repos-loading">Repositories information Loading...</h3>
				</div>
			</div>`
		)
    }

    noSuchUser() {
    	return(
			`<h2 class="text-center">No Such User</h2>`
		)
    }

    repoTile(repo) {
    	/*todo - make pagination*/
    	return(
    		`<div class="repo-tile">
    			<h4>Repo name: ${repo.name}</h4>
    			<p>Created: ${repo.created_at}</p>
    			<p>URL: <a href="${repo.url}">${repo.url}</a></p>
    			<p>Clone Url: ${repo.clone_url}</p>
    			<p>SSH Url: ${repo.ssh_url}</p>
    			<p>Default Branch: ${repo.default_branch}</p>
    			<p>Description: ${repo.description}</p>
    			<p>To download: <a href="${repo.url}">${repo.downloads_url}</a></p>
    		</div>`
    	)
    }

    noRepos() {
    	return(
			`<h2 class="text-center">User doesn't have any repos</h2>`
		)
    }
}

export default SingleUserComponent;