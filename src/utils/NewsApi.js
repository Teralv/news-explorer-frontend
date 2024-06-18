const customFetch = (url) =>
  fetch(url).then((res) =>
    res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`)
);

class NewsApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getArticles(keyword) {
    return customFetch(
      `${this._baseUrl}/everything?q=${keyword}&from=2024-06-08&to=2024-06-16&pageSize=10&apiKey=fcd640ebd8ea4b499b1bc1869a42467e`
    )

  }
}

const newsApi = new NewsApi({
  baseUrl: "https://newsapi.org/v2"
});

export default newsApi;