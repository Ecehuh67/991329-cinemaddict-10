import MovieModel from './models/movie';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};


const API = class {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;

    this._movies = null;

  }

  getCards() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then((cards) => {
        this._movies = cards;

        return Promise
          .all(cards.map((card) => this._load({url: `comments/${card.id}`})))
      })
      .then((response) => {
        return Promise.all(response.map((it) => it.json()))
      })
      .then((comments) => {
        this._movies.forEach((movie, index) => movie[`comments`] = comments[index]);
        const newMovies = this._movies;
        return newMovies;
      })
      .then(MovieModel.parseCards)
  }

  updateCard(id, data) {
    console.log(id,data)
    return this._load({
      utl: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then((cards) => {
        this._movies = cards;

        return Promise
          .all(cards.map((card) => this._load({url: `comments/${card.id}`})))
      })
      .then((response) => {
        return Promise.all(response.map((it) => it.json()))
      })
      .then((comments) => {
        this._movies.forEach((movie, index) => movie[`comments`] = comments[index]);
        const newMovies = this._movies;
        return newMovies;
      })
      .then(MovieModel.parseCards)

  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }

};

export default API;
