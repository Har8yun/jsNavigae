// per_page=42&page=1&q=as
// GITHUB API PARAMS
// example - https://api.github.com/search/users?per_page=42&page=1&q=blablabla
// example repos -// fetch('https://api.github.com/users/babo/repos')

const API_URL = 'https://api.github.com';
const API_URL_SEARCH_USERS = `${API_URL}/search/users?`;
const API_NAME_PARAM = 'q';
const API_PAGE_PARAM = 'page';
const API_PER_PAGE_PARAM = 'per_page';
const USERS_PER_PAGE = 10;

const API_URL_USER_REPOS = (function() {
	
	let userName = null;

	return {
		set userName(name) {
			userName = name;
		},

		get url() {
			return `https://api.github.com/users/${userName}/repos`;
		}
	}
})();


export { 
	API_URL,
	API_URL_SEARCH_USERS,
	API_NAME_PARAM,
	API_PAGE_PARAM,
	API_PER_PAGE_PARAM,
	API_URL_USER_REPOS,
	USERS_PER_PAGE
};