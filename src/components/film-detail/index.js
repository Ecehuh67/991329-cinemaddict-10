import AbstractSmartComponent from '../abstract-components/smart-component';
import {CommentEmojiImages} from '../../mocks/consts';
import {createDetailInfoTemplate} from './template';

export default class Popup extends AbstractSmartComponent {
  constructor(card) {
    super();

    this._card = card;
    this._commentEmojiImage = null;

    this._closeHandler = null;
    this._addToWatchlistHandler = null;
    this._addToWatchedHandler = null;
    this._addToFavoritesHandler = null;
    this._addNewCommentHandler = null;
    this._deleteButtomHandler = null;
    this._deleteElement = null;
    this._textValue = null;

    this._subscribeOnEmojiListEvents();
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
    this._recoverAddNewCommentHandler();
  }

  rerender() {
    super.rerender();
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
        const isSubmit = evt.keyCode === 13 && evt.ctrlKey || evt.keyCode === 13 && evt.metaKey;
        if (isSubmit) {
          const textValue = evt.target.value;
          if (textValue) {
            this._card.comments.push({text: evt.target.value, author: `Karl Kugel`, date: `2019/12/31 23:59`});
            this._card.emoji = this._commentEmojiImage;
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

    this._recoverDeleteButtomHandler();
    this._recoverAddNewCommentHandler()
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
        this.rerender();
      });

  }
}
