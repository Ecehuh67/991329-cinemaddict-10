import PopupComponent from '../components/film-detail/index';
import CardComponent from '../components/card/index';
import {render, RenderPosition, remove, replace} from '../utils/render';

const FilmMode = {
  DEFAULT: `default`,
  DETAILS: `details`
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._cardComponent = null;
    this._popupComponent = null;
    this._ratingComponent = null;
    this._deleteElement = null;
    this._textCommentValue = null;

    this._card = null;
    this._mode = FilmMode.DEFAULT;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._showPopup = this._showPopup.bind(this);
    this._addToWatchlistHandler = this._addToWatchlistHandler.bind(this);
    this._addToWatchedHandler = this._addToWatchedHandler.bind(this);
    this._addToFavoritesHandler = this._addToFavoritesHandler.bind(this);
    this._deleteCommentButtonHandler = this._deleteCommentButtonHandler.bind(this);
    this._addNewCommentHandler = this._addNewCommentHandler.bind(this);
  }

  render(card) {
    this._card = card;

    const oldCardComponent = this._cardComponent;
    const oldPopupComponent = this._popupComponent;

    this._cardComponent = this._createFilmComponent(this._card);
    this._popupComponent = this._createPopupComponent(this._card);

    if (oldCardComponent && oldPopupComponent) {
      this._cardComponent.turnOnHoverImitation();
      replace(this._cardComponent, oldCardComponent);
      this._cardComponent.turnOffHoverImitation();

      replace(this._popupComponent, oldPopupComponent);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }

  _createFilmComponent(card) {
    const filmComponent = new CardComponent(card);

    filmComponent.setClickHandler(this._showPopup);
    filmComponent.setAddToWatchlistHandler(this._addToWatchlistHandler);
    filmComponent.setAsWatchedHandler(this._addToWatchedHandler);
    filmComponent.setAddToFavoritesHandler(this._addToFavoritesHandler);

    return filmComponent;
  }

  _createPopupComponent(card) {
    const popupComponent = new PopupComponent(card);

    popupComponent.setButtonCloseHandler(this._closePopup);
    popupComponent.setAddToWatchlistHandler(this._addToWatchlistHandler);
    popupComponent.setAddWatchedHandler(this._addToWatchedHandler);
    popupComponent.setAddToFavoritesHandler(this._addToFavoritesHandler);
    popupComponent.setDeleteCommentButtonHandler(this._deleteCommentButtonHandler);
    popupComponent.setCreateNewCommentHandler(this._addNewCommentHandler);

    return popupComponent;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closePopup();
    }
  }

  _addToWatchlistHandler() {
    this._onDataChange(
        this,
        this._card,
        Object.assign({}, this._card, {isAddedToWatch: !this._card.isAddedToWatch}));
  }

  _addToWatchedHandler() {
    this._onDataChange(
        this,
        this._card,
        Object.assign({}, this._card, {isWatched: !this._card.isWatched}));
  }

  _addToFavoritesHandler() {
    this._onDataChange(
        this,
        this._card,
        Object.assign({}, this._card, {isFavorite: !this._card.isFavorite}));
  }

  _deleteCommentButtonHandler() {
    this._deleteElement = this._popupComponent._deleteElement.querySelector(`.film-details__comment-text`).textContent;
    this._onDataChange(this, this._card, null);
  }

  _addNewCommentHandler() {
    this._textCommentValue = this._popupComponent._textValue;
    this._onDataChange(this, null, this._card);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _showPopup() {
    if (this._mode === FilmMode.DETAILS) {
      return;
    }

    this._onViewChange();

    const bodyElement = document.querySelector(`body`);
    this._popupComponent = this._createPopupComponent(this._card);

    render(bodyElement, this._popupComponent, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, this._onEscKeyDown);

    this._mode = FilmMode.DETAILS;
  }

  _closePopup() {
    remove(this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._mode = FilmMode.DEFAULT;
  }

  setDefaultView() {
    if (this._mode !== FilmMode.DEFAULT) {
      this._closePopup();
    }
  }

  destroy() {
    remove(this._cardComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}