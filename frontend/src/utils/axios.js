import axios from 'axios';

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use((config) => {
	console.log('>>axios token', localStorage.getItem('session'));
	if (localStorage.getItem('session')) {
		const token = `${localStorage.getItem('session')}`;
		config.headers['Authorization'] = token;
	}
	return config;
});
export default axiosApiInstance;
