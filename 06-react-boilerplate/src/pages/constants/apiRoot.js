import home from './api/home';
const baseUrl = 'http://localhost:8080';

const API = Object.assgin(
	home
);

/*
	将API加上请求的地址,dev/dist;
*/
for(let i in API){
	API[i] = baseUrl+API[i];
}
export default API;