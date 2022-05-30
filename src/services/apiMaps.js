import axios from 'axios';

const apiMaps = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api/distancematrix'
});

export default apiMaps;