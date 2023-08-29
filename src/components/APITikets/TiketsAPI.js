import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://aviasales-test-api.kata.academy/',
});

const API = {
  async getTikets() {
    const id = await instance.get('search').then((res) => res.data.searchId);
    const tickets = await instance.get(`tickets?searchId=${id}`);
    return tickets;
  },
};

export default API;
