import Store from '../store/store.js';
import Controller from '../origin/controller.js';
import SingleUserComponent from '../components/singleUser.js';

class SingleUser extends Controller {
    constructor(...props) {
    	super(props);
    	
    	this.userId = Number(props[1]);
		this.show();
    }

    show() {
    	let user;

        if (this.userId) {
        	user = Store.getKey('users', this.userId);
        }
		
		// Draw component
        new SingleUserComponent().render(user);
    }

}

export default SingleUser;