// import CardComponent from '../components/card';
import ButtonComponent from '../components/show-more-button';
import NoCardComponent from '../components/no-card';
import PosterComponent from '../components/poster';
import SortComponent, {SortType} from '../components/sort';
import TopListComponent from '../components/top-list';
// import PopupComponent from '../components/detail';
import {render, RenderPosition, remove} from '../utils/render';
import {rubricsForTop} from '../mocks/consts';
import {getConditionFilms} from '../utils/common';
import MovieController from './movie';

const SHOWING_CARD = 5;
const CARD_COUNT_BY_BUTTON = 5;
const FILM_POPULAR = 2;
const TOP_LIST_AMOUNT = 2;

export let showingCardCount = SHOWING_CARD;

export const renderCards = (filmsListElement, cards, onDataChange) => {
  return cards.map((card) => {
    const movieController = new MovieController(filmsListElement, onDataChange);
    movieController.render(card);
    return movieController;
  })
};

const createFilmContainers = (place, count) => {
  new Array(count)
    .fill(``)
    .forEach((it, i) => {
      render(place, new TopListComponent(rubricsForTop[i]), RenderPosition.BEFOREEND);
    });
};

// const renderTopListFilms = (container, cards) => {
//   const ratedContainerElements = container.querySelectorAll(`section.films-list--extra > .films-list__container`);
//
//   Array.from(ratedContainerElements).forEach((it) => {
//
//     switch (it.previousElementSibling.firstChild.data) {
//       case `Top rated`:
//         getConditionFilms(cards, FILM_POPULAR, `rate`).forEach((item) => renderCard(it, item));
//         break;
//       case `Most commented`:
//         getConditionFilms(cards, FILM_POPULAR, `comments`).forEach((item) => renderCard(it, item));
//         break;
//     }
//   });
// };

export default class PageController {
  constructor(container) {
    this._container = container;
    this._cards = [];
    this._loadMoreComponent = new ButtonComponent();
    this._noCardsComponent = new NoCardComponent();
    this._posterComponent = new PosterComponent();
    this._sortComponent = new SortComponent();
    this._movieController = new MovieController(this._posterComponent);

    this._onDataChange = this._onDataChange.bind(this);
  }

  render(cards) {
    this._cards = cards;
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

    const mainElement = document.querySelector(`main`);
    render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);

    const container = this._container.getElement();
    const isCards = cards.length;

    if (!isCards) {
      render(container, this._noCardsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._posterComponent, RenderPosition.BEFOREEND);

    const filmsListElement = this._posterComponent.getElement().querySelector(`.films-list__container`);

    renderCards(filmsListElement, cards.slice(0, showingCardCount), this._onDataChange);
    renderLoadMoreButton();

    createFilmContainers(container, TOP_LIST_AMOUNT);

    // renderTopListFilms(container, cards);


    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedCards = [];

      switch (sortType) {
        case SortType.DATE:
          sortedCards = cards.slice().sort((a, b) => b.year - a.year);
          break;
        case SortType.RATING:
          sortedCards = cards.slice().sort((a, b) => b.rate - a.rate);
          break;
        case SortType.DEFAULT:
          sortedCards = cards.slice(0, showingCardCount);
          break;
      }

      filmsListElement.innerHTML = ``;
      renderCards(filmsListElement, sortedCards);

      if (sortType === SortType.Default) {
        renderLoadMoreButton();
      } else {
        remove(this._loadMoreComponent);
      }
    });
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._cards.findIndex((it) => it === oldData);

    console.log(index);

    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));

    movieController.render(this._cards[index]);
    console.log('card was changed');
  }
}
