import ButtonComponent from '../components/show-more-button';
import NoCardComponent from '../components/no-card';
import PosterComponent from '../components/poster';
import SortComponent, {SortType} from '../components/sort';
import TopListComponent from '../components/top-list';
import {render, RenderPosition, remove} from '../utils/render';
import {rubricsForTop} from '../mocks/consts';
import {getConditionFilms} from '../utils/common';
import MovieController from './movie';

const SHOWING_CARD = 5;
const CARD_COUNT_BY_BUTTON = 5;
const FILM_POPULAR = 2;
const TOP_LIST_AMOUNT = 2;

// export let showingCardCount = SHOWING_CARD;

export const renderCards = (filmsListElement, cards, onDataChange, onViewChange) => {
  return cards.map((card) => {
    const movieController = new MovieController(filmsListElement, onDataChange, onViewChange);
    movieController.render(card);
    return movieController;
  });
};

const createFilmContainers = (place, count) => {
  new Array(count)
    .fill(``)
    .forEach((it, i) => {
      render(place, new TopListComponent(rubricsForTop[i]), RenderPosition.BEFOREEND);
    });
};

const renderTopListFilms = (container, cards, onDataChange, onViewChange) => {
  const ratedContainerElements = container.querySelectorAll(`section.films-list--extra > .films-list__container`);

  Array.from(ratedContainerElements).forEach((it) => {

    switch (it.previousElementSibling.firstChild.data) {
      case `Top rated`:
        const ratedCards = getConditionFilms(cards, FILM_POPULAR, `rate`);
        renderCards(it, ratedCards, onDataChange, onViewChange);
        break;
      case `Most commented`:
        const commentedCards = getConditionFilms(cards, FILM_POPULAR, `comments`);
        renderCards(it, commentedCards, onDataChange, onViewChange);
        break;
    }
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;
    this._cards = [];
    this._showedCardControllers = [];
    this._showingCardCount = SHOWING_CARD;
    this._loadMoreComponent = new ButtonComponent();
    this._noCardsComponent = new NoCardComponent();
    this._posterComponent = new PosterComponent();
    this._sortComponent = new SortComponent();
    this._movieController = new MovieController(this._posterComponent);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _renderLoadMoreButton() {
    if (this._showingCardCount >= this._cards.length) {
      return;
    }

    const container = this._posterComponent.getElement();

    render(container, this._loadMoreComponent, RenderPosition.BEFOREEND);

    this._loadMoreComponent.setButtonClickHandler(() => {
      const showedCards = this._showingCardCount;
      this._showingCardCount += CARD_COUNT_BY_BUTTON;

      const filmsListElement = this._posterComponent.getElement().querySelector(`.films-list__container`);

      const newCards = renderCards(filmsListElement, this._cards.slice(showedCards, this._showingCardCount), this._onDataChange, this._onViewChange);
      this._showedCardControllers = this._showedCardControllers.concat(newCards);

      if (this._showingCardCount >= this._cards.length) {
        remove(this._loadMoreComponent);
      }
    });
  }

  render(cards) {
    this._cards = cards;

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

    const newCards = renderCards(filmsListElement, cards.slice(0, this._showingCardCount), this._onDataChange, this._onViewChange);
    this._showedCardControllers = this._showedCardControllers.concat(newCards);
    this._renderLoadMoreButton();

    createFilmContainers(container, TOP_LIST_AMOUNT);
    renderTopListFilms(container, cards, this._onDataChange, this._onViewChange);
  }

  _onSortTypeChange(sortType) {
    let sortedCards = [];

    switch (sortType) {
      case SortType.DATE:
        sortedCards = this._cards.slice().sort((a, b) => b.year - a.year);
        break;
      case SortType.RATING:
        sortedCards = this._cards.slice().sort((a, b) => b.rate - a.rate);
        break;
      case SortType.DEFAULT:
        sortedCards = this._cards.slice(0, this._showingCardCount);
        break;
    }

    const filmsListElement = this._posterComponent.getElement().querySelector(`.films-list__container`);

    filmsListElement.innerHTML = ``;

    const newCards = renderCards(filmsListElement, sortedCards, this._onDataChange, this._onViewChange);
    this._showedCardControllers = newCards;

    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      remove(this._loadMoreComponent);
    }
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._cards.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._cards = [].concat(this._cards.slice(0, index), newData, this._cards.slice(index + 1));

    movieController.render(this._cards[index]);
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }
}
