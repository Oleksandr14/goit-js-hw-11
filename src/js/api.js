import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '28021397-efd8f00a24064632ececcc08e';

export default {
  searchQuery: '',
  key: API_KEY,
  page: 1,
  perPage: 40,
  async fetchPhotos() {
    try {
      const { data } = await axios.get(
        `/?key=${this.key}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`,
      );
      this.incrementPage();

      return data;
    } catch (error) {
      console.error(error);
    }
  },

  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};