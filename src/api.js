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

        this._movies.forEach((movie) => movie['comments'] = this._load({url: `comments/${movie.id}`}))
        return this._movies;
      })
      .then((data) => {
        console.log(data)
      })
      // .then((cards) => {
      //   films = cards;
      //   const tr = cards.map((card) => ({'id': card.id, 'comments': this._load({url: `comments/${card.id}`})}))
      //   return tr
      //   // return cards.map((card) => ({'id': card.id, comments: this._load({url: `comments/${card.id}`})}))
      // })
      // .then((comments) => console.log(films))
      // .then(MovieModel.parseCards)
  }

  updateCard(id, data) {

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
