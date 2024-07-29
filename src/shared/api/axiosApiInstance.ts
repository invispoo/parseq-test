import axios from 'axios';

const axiosApiInstance = axios.create({
  baseURL: 'https://testapi2.parseq.pro',
  headers: {
    'Content-Type': 'application/json;',
  },
});

export default axiosApiInstance;
