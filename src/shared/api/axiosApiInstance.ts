import axios from "axios";

const axiosApiInstance = axios.create({
    baseURL: 'https://testapi2.parseq.pro/',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});

export default axiosApiInstance;