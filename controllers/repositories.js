import Controller from '../origin/controller.js'
import RepositoriesComponent from '../components/repositories.js';

class Repositories extends Controller {
	constructor(...props) {
        super(...props);
        this.show();
    }

    show() {
    	let component = new RepositoriesComponent();
        component.render();
    }
}

export default Repositories;