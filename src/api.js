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
    this._movie = null;

  }

  getCards() {
    return this._load({url: `movies`})
      .then((response) => response.json())
      .then((cards) => {
        this._movies = cards;
        return Promise
          .all(cards.map((card) => this._load({url: `comments/${card.id}`})));
      })
      .then((response) => {
        return Promise.all(response.map((it) => it.json()));
      })
      .then((comments) => {
        this._movies.forEach((movie, index) => {
          return movie[`comments`] = comments[index];
        });
        const newMovies = this._movies;
        return newMovies;
      })
      .then(MovieModel.parseCards);
  }

  updateCard(id, data) {
    return this._load({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.convertToServer()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then((card) => {
        this._movie = card;
        return this._load({url: `comments/${card.id}`});
      })
      .then((response) => response.json())
      .then((comments) => {
        this._movie[`comments`] = comments;
        const newMovie = this._movie;
        return newMovie;
      })
      .then(MovieModel.parseCard);
  }

  createComment(card) {
    return this._load({
      url: `comments/${card.id}`,
      method: Method.POST,
      body: JSON.stringify(card.converCommentToServer()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this._movie = result.movie;
        this._movie[`comments`] = result.comments;
        return this._movie;
      })
      .then(MovieModel.parseCard);
  }

  deleteComment(id) {
    return this._load({url: `comments/${id}`, method: Method.DELETE});
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
