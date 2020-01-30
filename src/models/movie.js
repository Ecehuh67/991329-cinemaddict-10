export default class Movie {
  constructor(cards) {
    this.id = cards[`id`];
    this.filmInfo = cards[`film_info`];
    this.userDetails = cards[`user_details`];
    this.comments = cards[`comments`];
  }

  toRAW() {
    return ({
      'id': this.id,
      'film_info': this.filmInfo,
      'user_details': this.userDetails,
      'comments': this.comments
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

  _convertComments(comments) {
    return comments.map((comment) => comment.id);
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
