const baseUrl = 'https://pixabay.com/api/';
const idKEY = '15725312-965e6abfe89225a1afd144b44';
export default {
  page: 1,
  query: '',
  fetchPhoto() {
    const requestParams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12`;
    return fetch(baseUrl + requestParams + `&key=` + idKEY)
      .then(res => res.json())
      .then(parsedResponse => {
        this.incrementPage();

        return parsedResponse.hits;
      });
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
