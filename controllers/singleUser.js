import Store from '../store/store.js';
import Controller from '../origin/controller.js';
import SingleUserComponent from '../components/singleUser.js';
import { API_URL_USER_REPOS } from '../constants/api.js';

class SingleUser extends Controller {
    constructor(...props) {
    	super(props);
    	
    	this.userId = Number(props[1]);
        this.userRepos = null;
		this.show();
    }

    show() {
        if (this.userId) {
        	this.user = Store.getKey('users', this.userId);
        }
        
        let component = new SingleUserComponent();
        // Draw component
        component.render(this.user);

        // Get user repos;
        if (this.userId) {
            this.getUserRepos(component);
        }
    }

    getUserRepos(component) {
        let reposUrlObject = API_URL_USER_REPOS;
        reposUrlObject.userName = this.user.login;

        fetch(reposUrlObject.url)
        .then(response => {
            var contentType = response.headers.get("content-type");
            if(contentType && contentType.includes("application/json")) {
              return response.json();
            }
            throw new TypeError("Oops, we haven't got JSON!");
        })
        .then(reposJson => {
            this.userRepos = reposJson;
            Store.save('userRepos', reposJson);
            // Draw repos.
            component.renderRepos(reposJson);
        })
        .catch(error => {
            console.log(error)
        })
    }
}

export default SingleUser;