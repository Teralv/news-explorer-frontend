const customFetch = (url, header) =>
  fetch(url, header).then((res) =>{
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Something went wrong: ${res.status}`)
  });

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo(token) {
    return customFetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      }
    });
  }

  getSavedArticles(token) {
    return customFetch(`${this._baseUrl}/articles`, {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    });
  }

  saveNewArticle(card, token) {
    return customFetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        keyword: card.keyword,
        title: card.article.title,
        text: card.article.description,
        date: card.article.publishedAt,
        source: card.article.source.name,
        link: card.article.url,
        image: card.article.urlToImage,
      })
    });
  }

  deleteArticle(articleId, token) {
    return customFetch(`${this._baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        authorization: `Bearer ${token}`,
      },
    });
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.news-explorer.ignorelist.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;