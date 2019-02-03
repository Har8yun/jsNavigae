// per_page=42&page=1&q=as
// GITHUB API PARAMS
// example - https://api.github.com/search/users?per_page=42&page=1&q=blablabla

const API_URL = 'https://api.github.com';
const API_URL_SEARCH_USERS = `${API_URL}/search/users?`;
const API_NAME_PARAM = 'q';
const API_PAGE_PARAM = 'page';
const API_PER_PAGE_PARAM = 'per_page';
const USERS_PER_PAGE = 20;


export { 
	API_URL,
	API_URL_SEARCH_USERS,
	API_NAME_PARAM,
	API_PAGE_PARAM,
	API_PER_PAGE_PARAM,
	USERS_PER_PAGE
};