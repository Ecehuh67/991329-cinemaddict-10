import CardComponent from '../components/card';
import ButtonComponent from '../components/show-more-button';
import NoCardComponent from '../components/no-card';
import PosterComponent from '../components/poster';
import TopListComponent from '../components/top-list';
import PopupComponent from '../components/detail';
import {render, RenderPosition, remove} from '../utils/render';
import {rubricsForTop} from '../mocks/consts';
import {getConditionFilms} from '../utils/common';


const SHOWING_CARD = 5;
const CARD_COUNT_BY_BUTTON = 5;
const FILM_POPULAR = 2;
const TOP_LIST_AMOUNT = 2;

let showingCardCount = SHOWING_CARD;

const renderCard = (cardListElement, card) => {
  const cardComponent = new CardComponent(card);

  render(cardListElement, cardComponent, RenderPosition.BEFOREEND);

  const createPopupElement = (item) => {
    const popupComponent = new PopupComponent(item);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        remove(popupComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);

    popupComponent.setButtonCloseHandler(() => {
      remove(popupComponent);
    });

    return popupComponent;
  };

  cardComponent.setClickHandler(() => {
    const isPopup = document.querySelector(`.film-details`);
    const bodyElement = document.querySelector(`body`);

    if (isPopup) {
      isPopup.remove();
    }

    render(bodyElement, createPopupElement(card), RenderPosition.BEFOREEND);
  });
};

const renderCards = (filmsListElement, cards) => {
  cards.forEach((card) => renderCard(filmsListElement, card));
};

const createFilmContainers = (place, count) => {
  new Array(count)
    .fill(``)
    .forEach((it, i) => {
      render(place, new TopListComponent(rubricsForTop[i]), RenderPosition.BEFOREEND);
    });
};

const renderTopListFilms = (container, cards) => {
  const ratedContainerElements = container.querySelectorAll(`section.films-list--extra > .films-list__container`);

  Array.from(ratedContainerElements).forEach((it) => {

    switch (it.previousElementSibling.firstChild.data) {
      case `Top rated`:
        getConditionFilms(cards, FILM_POPULAR, `rate`).forEach((item) => renderCard(it, item));
        break;
      case `Most commented`:
        getConditionFilms(cards, FILM_POPULAR, `comments`).forEach((item) => renderCard(it, item));
        break;
    }
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._loadMoreComponent = new ButtonComponent();
    this._noCardsComponent = new NoCardComponent();
    this._posterComponent = new PosterComponent();
  }

  render(cards) {
    const renderLoadMoreButton = () => {
      if (showingCardCount >= cards.length) {
        return;
      }

      const container = this._posterComponent.getElement();

      render(container, this._loadMoreComponent, RenderPosition.BEFOREEND);

      this._loadMoreComponent.setButtonClickHandler(() => {
        const showedCards = showingCardCount;
        showingCardCount += CARD_COUNT_BY_BUTTON;

        renderCards(filmsListElement, cards.slice(showedCards, showingCardCount));

        if (showingCardCount >= cards.length) {
          remove(this._loadMoreComponent);
        }
      });
    };

    const container = this._container.getElement();
    const isCards = cards.length;

    if (!isCards) {
      render(container, this._noCardsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._posterComponent, RenderPosition.BEFOREEND);

    const filmsListElement = this._posterComponent.getElement().querySelector(`.films-list__container`);

    renderCards(filmsListElement, cards.slice(0, showingCardCount));
    renderLoadMoreButton();

    createFilmContainers(container, TOP_LIST_AMOUNT);

    renderTopListFilms(container, cards);
  }
}
