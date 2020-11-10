import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-course-demo-1bf90.firebaseio.com/'
});

export default instance;