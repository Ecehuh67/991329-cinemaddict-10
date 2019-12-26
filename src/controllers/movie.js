import PopupComponent from '../components/detail';
import RatingComponent from '../components/rating';
import CardComponent from '../components/card';
import {render, RenderPosition, remove, replace} from '../utils/render';

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;

    this._cardComponent = null;
    this._popupComponent = null;

    this._onDataChange = onDataChange;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(card) {
    const bodyElement = document.querySelector(`body`);

    const oldCardComponent = this._cardComponent;
    const oldPopupComponent = this._popupComponent;

    this._cardComponent = new CardComponent(card);
    this._popupComponent = new PopupComponent(card);

    this._cardComponent.setClickHandler((card) => {
      render(bodyElement, this._popupComponent, RenderPosition.BEFOREEND);
      document.addEventListener('keydown', this._onEscKeyDown);
    });

    this._popupComponent.setButtonCloseHandler(() => {
      remove(this._popupComponent);
      this._popupComponent._reset();
    });

    this._popupComponent.setAddToWatchlistLabelHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isAddedToWatch: !card.isAddedToWatch,
      }));
      this._popupComponent._reset();
      console.log('popup handler is executed')
    });

    this._cardComponent.setAddToWatchlistButtonHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isAddedToWatch: !card.isAddedToWatch,
      }));
    });

    this._cardComponent.setAsWatchedButtonHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched,
      }));
    })

    this._popupComponent.setAsWatchedLabelHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched,
      }));
    });

    this._cardComponent.setAddToFavoritesButtonHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavorite: !card.isFavorite,
      }));
    })

    this._popupComponent.setAddToFavoritesLabelHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched,
      }));
    });


    if (oldCardComponent && oldPopupComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._popupComponent, oldPopupComponent);
      this._popupComponent._reset();
      console.log(oldCardComponent);
    } else {
      render(this._container, this._cardComponent, RenderPosition.BEFOREEND);
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(this._popupComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
      this._popupComponent._reset();
    }
  }
}
