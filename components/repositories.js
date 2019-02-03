import Component from '../origin/component.js';

class RepositoriesComponent extends Component {
	render() {
		this.rootElem.innerHTML = this.init();
	}

	init() {
		return(
			`<h5 class="text-center">TO DO Repos Like Users Page</h5>`
		)
	}
}

export default RepositoriesComponent;