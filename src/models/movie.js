export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.filmInfo = data[`film_info`];
    this.userDetails = data[`user_details`];
    this.comments = data[`comments`];
    // this.comments = data[`comments`];
    // this.commentsCount = this.comments ? this.comments.length : ``;
    // this.title = data[`film_info`][`title`];
    // this.alternativeTitle = data[`film_info`][`alternative_title`];
    // this.totalRating = data[`film_info`][`total_rating`];
    // this.poster = data[`film_info`][`poster`];
    // this.ageRating = data[`film_info`][`age_rating`];
    // this.director = data[`film_info`][`director`];
    // this.writers = data[`film_info`][`writers`];
    // this.actors = data[`film_info`][`actors`];
    // this.dataRelease = data[`film_info`][`release`][`date`];
    // this.countryRelease = data[`film_info`][`release`][`release_country`];
    // this.runtime = data[`film_info`][`runtime`];
    // this.genre = data[`film_info`][`genre`];
    // this.description = data[`film_info`][`description`];
    // this.personalRating = data[`user_details`][`personal_rating`];
    // this.watchlist = Boolean(data[`user_details`][`watchlist`]);
    // this.watched = Boolean(data[`user_details`][`already_watched`]);
    // this.watchingDate = data[`user_details`][`watching_date`];
    // this.favorite = Boolean(data[`user_details`][`favorite`]);
  }

  toRAW() {
    return ({
      'id': this.id,
      'film_info': this.filmInfo,
      'user_details': this.userDetails,
      'comments': this.comments

      // 'id': this.id,
      // 'comments': this.comments,
      // 'film_info': {
      //   'title': this.title,
      //   'alternative_title': this.alternativeTitle,
      //   'totalRating': this.totalRating,
      //   'poster': this.poster,
      //   'age_rating': this.ageRating,
      //   'director': this.director,
      //   'writers': this.writers,
      //   'actors': this.actors,
      //   'release': this.release,
      //   'date': this.dataRelease,
      //   'release_country': this.release_country,
      //   'runtime': this.runtime,
      //   'genre': this.genre,
      //   'description': this.description
      // },
      // 'user_details': {
      //   'personal_rating': this.personalRating,
      //   'watchlist': this.watchlist,
      //   'already_watched': this.watched,
      //   'watching_date': this.watchingDate,
      //   'favorite': this.favorite
      // }
    });
  }

  convertToServer() {
    return ({
      'id': this.id,
      'film_info': this.filmInfo,
      'user_details': this.userDetails,
      'comments': this._convertComments(this.comments)
    });
  }

  converCommentToServer() {
    const newComment = this.comments.slice(this.comments.length - 1);
    return ({
      'comment': newComment[0].comment,
      'date': newComment[0].date,
      'emotion': newComment[0].emotion
    });
  }

  _convertComments(data) {
    return data.map((it) => it.id);
  }

  static parseCard(data) {
    return new Movie(data);
  }

  static parseCards(data) {
    return data.map(Movie.parseCard);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
