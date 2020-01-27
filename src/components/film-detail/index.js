import AbstractSmartComponent from '../abstract-components/smart-component';
import {CommentEmojiImages} from '../../mocks/consts';
import {getRandomNumber} from '../../utils/common';
import {createDetailInfoTemplate} from './template';
import he from 'he';

const ENTER_KEYCODE = 13;

export default class Popup extends AbstractSmartComponent {
  constructor(card) {
    super();

    this._card = card;
    this._commentEmojiImage = null;
    this._textValue = null;
    this._textElement = null;
    this._deleteElement = null;
    this._personalRating = null;

    this._closeHandler = null;
    this._addToWatchlistHandler = null;
    this._addToWatchedHandler = null;
    this._addToFavoritesHandler = null;
    this._addNewCommentHandler = null;
    this._deleteButtomHandler = null;
    this._ratingButtomHandler = null;
    this._resetRatingButtonHandler = null;
  }

  getTemplate() {
    return createDetailInfoTemplate(this._card, {commentEmojiImage: this._commentEmojiImage});
  }

  setButtonCloseHandler(handler) {
    this._closeHandler = handler;
    this._recoverCloseHandler();
  }

  setAddToWatchlistHandler(handler) {
    this._addToWatchlistHandler = handler;
    this._recoverAddToWatchlistHandler();
  }

  setAddWatchedHandler(handler) {
    this._addToWatchedHandler = handler;
    this._recoverAddToWatchedHandler();
  }

  setAddToFavoritesHandler(handler) {
    this._addToFavoritesHandler = handler;
    this._recoverAddToFavoritesHandler();
  }

  setDeleteCommentButtonHandler(handler) {
    this._deleteButtomHandler = handler;
    this._recoverDeleteButtomHandler();
  }

  setCreateNewCommentHandler(handler) {
    this._addNewCommentHandler = handler;

    this._subscribeOnEmojiListEvents();
    // this._recoverAddNewCommentHandler();
  }

  setAddNewFilmRatingHandler(handler) {
    this._ratingButtomHandler = handler;
    this._recoverRatingButtomHandler();
  }

  setResetRatingButton(handler) {
    this._resetRatingButtonHandler = handler;
    this._recoverResetRatingButtonHandler();
  }

  rerender() {
    super.rerender();
  }

  _recoverResetRatingButtonHandler() {
    const watchedButton = this.getElement().querySelector(`.film-details__control-label--watched`);
    const undoButton = this.getElement().querySelector(`.film-details__watched-reset`);

    const resetRating = () => {
      this._personalRating = 0;
      this._ratingButtomHandler();
    };

    watchedButton.addEventListener(`click`, resetRating);

    if (undoButton) {
      undoButton.addEventListener(`click`, resetRating);
    }
  }

  _recoverRatingButtomHandler() {
    this
      .getElement()
      .querySelectorAll(`.film-details__user-rating-label`)
      .forEach((label) => label.addEventListener(`click`, (evt) => {
        this._personalRating = evt.target.textContent;
        this._ratingButtomHandler();
      }));

  }

  _recoverDeleteButtomHandler() {
    this
      .getElement()
      .querySelectorAll(`.film-details__comment`)
      .forEach((li) => li.addEventListener(`click`, (evt) => {
        const deleteButton = li.querySelector(`.film-details__comment-delete`);
        if (evt.target === deleteButton) {
          evt.preventDefault();
          this._deleteElement = evt.currentTarget;
          this._deleteButtomHandler();
        } else {
          return;
        }
      }));
  }

  _recoverAddNewCommentHandler() {
    this
      .getElement()
      .querySelector(`.film-details__comment-input`).
      addEventListener(`keydown`, (evt) => {
        const isSubmit = evt.keyCode === ENTER_KEYCODE && evt.ctrlKey || evt.keyCode === ENTER_KEYCODE && evt.metaKey;
        if (isSubmit) {
          this._textValue = he.encode(evt.target.value);
          if (this._textValue) {
            const randomId = getRandomNumber(10000);
            this._card.comments.push({
              id: `${randomId}`,
              author: `Karl Kugel`,
              emotion: this._commentEmojiImage.slice(0, -4),
              comment: this._textValue,
              date: new Date().toISOString(),
            });
          }
          this._addNewCommentHandler();
        }
      });
  }

  _recoverAddToWatchlistHandler() {
    this
      .getElement()
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, this._addToWatchlistHandler);
  }

  _recoverAddToWatchedHandler() {
    this
      .getElement()
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, this._addToWatchedHandler);
  }

  _recoverAddToFavoritesHandler() {
    this
      .getElement()
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, this._addToFavoritesHandler);
  }

  _recoverCloseHandler() {
    this
      .getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this._closeHandler);
  }

  recoverListeners() {
    this._subscribeOnEmojiListEvents();

    this._recoverResetRatingButtonHandler();
    this._recoverRatingButtomHandler();
    this._recoverDeleteButtomHandler();
    this._recoverAddNewCommentHandler();
    this._recoverAddToWatchlistHandler();
    this._recoverAddToWatchedHandler();
    this._recoverAddToFavoritesHandler();
    this._recoverCloseHandler();
  }

  _subscribeOnEmojiListEvents() {
    this
      .getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`change`, (evt) => {
        evt.preventDefault();
        this._commentEmojiImage = CommentEmojiImages[evt.target.value];

        this._recoverAddNewCommentHandler();

        this._textValue = he.encode(this._getUserCommentInput().value);

        this.rerender();

        this._getUserCommentInput().value = this._textValue;
      });

  }

  _getUserCommentInput() {
    this._textElement = this.getElement().querySelector(`.film-details__comment-input`);
    return this._textElement;
  }
}
