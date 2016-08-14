import home from './api/home';
const baseUrl = 'http://localhost:3000';
const API = Object.assign(
	home
);

/*
	将API加上请求的地址,dev/dist;
*/
for(let i in API){
	API[i] = baseUrl+API[i];
}
export default API;