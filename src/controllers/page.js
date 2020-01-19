import ButtonComponent from '../components/show-more-button/index';
import NoCardComponent from '../components/no-card/index';
import PosterComponent from '../components/poster-container/index';
import SortComponent from '../components/sort/index';
import {SortType} from '../components/sort/template';
import TopListComponent from '../components/top-list/index';
import {render, RenderPosition, remove} from '../utils/render';
import {rubricsForTop} from '../mocks/consts';
import {getConditionFilms} from '../utils/common';
import MovieController from './movie';

const SHOWING_CARD = 5;
const CARD_COUNT_BY_BUTTON = 5;
const FILM_POPULAR = 2;
const TOP_LIST_AMOUNT = 2;

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
        const commentedCards = getConditionFilms(cards, FILM_POPULAR, `commentCount`);
        renderCards(it, commentedCards, onDataChange, onViewChange);
        break;
    }
  });
};

export default class PageController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

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
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._moviesModel.setFilterChangeHandler(this._onFilterChange);
  }

  _renderLoadMoreButton() {
    remove(this._loadMoreComponent);

    if (this._showingCardCount >= this._moviesModel.getCards().length) {
      return;
    }

    const container = this._posterComponent.getElement();

    render(container, this._loadMoreComponent, RenderPosition.BEFOREEND);

    this._loadMoreComponent.setButtonClickHandler(this._onLoadMoreButtonClick);
  }

  hide() {
    this._sortComponent.hide();
    this._container.hide();
  }

  show() {
    this._sortComponent.show();
    this._container.show();
  }

  render() {
    const cards = this._moviesModel.getCards();

    const mainElement = document.querySelector(`main`);
    render(mainElement, this._sortComponent, RenderPosition.BEFOREEND);

    const container = this._container.getElement();
    const isCards = cards.length;

    if (!isCards) {
      render(container, this._noCardsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._posterComponent, RenderPosition.BEFOREEND);

    this._renderCards(cards.slice(0, this._showingCardCount));

    this._renderLoadMoreButton();

    createFilmContainers(container, TOP_LIST_AMOUNT);
    renderTopListFilms(container, cards, this._onDataChange, this._onViewChange);
  }

  _renderCards(cards) {
    const filmsListElement = this._posterComponent.getElement().querySelector(`.films-list__container`);

    const newCards = renderCards(filmsListElement, cards.slice(0, this._showingCardCount), this._onDataChange, this._onViewChange);
    this._showedCardControllers = this._showedCardControllers.concat(newCards);
    this._showingCardCount = this._showedCardControllers.length;
  }

  _removeCards() {
    this._showedCardControllers.forEach((movieController) => movieController.destroy());
    this._showedCardControllers = [];
  }

  _onSortTypeChange(sortType) {
    let sortedCards = [];
    const cards = this._moviesModel.getCards();

    switch (sortType) {
      case SortType.DATE:
        sortedCards = cards.slice().sort((a, b) => b.year - a.year);
        break;
      case SortType.RATING:
        sortedCards = cards.slice().sort((a, b) => b.rate - a.rate);
        break;
      case SortType.DEFAULT:
        sortedCards = cards.slice(0, this._showingCardCount);
        break;
    }

    this._removeCards();
    this._renderCards(sortedCards);

    if (sortType === SortType.DEFAULT) {
      this._renderLoadMoreButton();
    } else {
      remove(this._loadMoreComponent);
    }
  }

  _updateCards(count) {
    this._removeCards();
    this._renderCards(this._moviesModel.getCards().slice(0, count));
    this._renderLoadMoreButton();
  }

  _onDataChange(movieController, oldData, newData) {
    if (newData === null) {
      const card = oldData;
      const index = oldData.comments.findIndex((it) => it.text === movieController._deleteElement);

      const newComments = card.comments.filter((_, i) => i !== index);

      card.comments = newComments;

      this._updateCards(this._showingCardCount);

      movieController.render(card);

    } else if (oldData === null) {

      this._updateCards(this._showingCardCount);

      movieController.render(newData);

    } else {
      const isSuccess = this._moviesModel.updateCard(oldData.id, newData);

      if (isSuccess) {
        movieController.render(newData);
      }
    }
  }

  _onViewChange() {
    this._showedCardControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._removeCards();
    this._renderCards(this._moviesModel.getCards().slice(0, SHOWING_CARD));
    this._renderLoadMoreButton();
  }

  _onLoadMoreButtonClick() {
    const showedCards = this._showingCardCount;
    this._showingCardCount += CARD_COUNT_BY_BUTTON;
    const cards = this._moviesModel.getCards();

    this._renderCards(cards.slice(showedCards, this._showingCardCount));

    if (this._showingCardCount >= cards.length) {
      remove(this._loadMoreComponent);
    }
  }
}
