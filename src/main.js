import RankComponent from './components/user-rank.js';
import FilterComponent from './components/filters.js';
import SortComponent from './components/sort.js';
import ContainerComponent from './components/film-container.js';
import PosterComponent from './components/poster.js';
import CardComponent from './components/card.js';
import ButtonComponent from './components/show-more-button.js';
import TopListComponent from './components/top-list.js';
import PopupComponent from './components/detail.js';
import {generateCards} from './mocks/card.js';
import {generateFilters} from './mocks/filter.js';
import {rubricsForTop} from './mocks/consts.js';
import {getRandomNumber, getConditionFilms, render, RenderPosition} from './mocks/utils.js';

const FILM_COUNT = 15;
const SHOWING_CARD = 5;
const CARD_COUNT_BY_BUTTON = 5;
const FILM_POPULAR = 2;
const TOP_LIST_AMOUNT = 2;
let showingCardCount = SHOWING_CARD;

const headerElement = document.querySelector(`.header`);

// Randomly generate a number for getting Rate of user
const randomRate = getRandomNumber(90);
render(headerElement, new RankComponent(randomRate).getElement(), RenderPosition.BEFOREEND);

const cards = generateCards(FILM_COUNT);
const filters = generateFilters(cards);

const mainElement = document.querySelector(`.main`);

render(mainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
const filmsContainerElement = new ContainerComponent();
render(mainElement, filmsContainerElement.getElement(), RenderPosition.BEFOREEND);

const filmsPosterElement = new PosterComponent();
render(filmsContainerElement.getElement(), filmsPosterElement.getElement(), RenderPosition.BEFOREEND);

const filmsListElement = filmsPosterElement.getElement().querySelector(`.films-list__container`);

cards.slice(0, showingCardCount).forEach((card) => render(filmsListElement, new CardComponent(card).getElement(), RenderPosition.BEFOREEND));

render(filmsPosterElement.getElement(), new ButtonComponent().getElement(), RenderPosition.BEFOREEND);

new Array(TOP_LIST_AMOUNT)
  .fill(``)
  .forEach((it, i) => {
    render(filmsContainerElement.getElement(), new TopListComponent(rubricsForTop[i]).getElement(), RenderPosition.BEFOREEND);
  })

const ratedContainerElements = filmsContainerElement.getElement().querySelectorAll(`section.films-list--extra > .films-list__container`);

Array.from(ratedContainerElements).forEach((it) => {
  const card = new CardComponent();
  switch(it.previousElementSibling.firstChild.data) {
    case `Top rated`:
    console.log('1');
      getConditionFilms(cards, FILM_POPULAR, 'rate').forEach((card) => render(it, new CardComponent(card).getElement(), RenderPosition.BEFOREEND));
      break;
    case `Most commented`:
      getConditionFilms(cards, FILM_POPULAR, 'comments').forEach((card) => render(it, new CardComponent(card).getElement(), RenderPosition.BEFOREEND));
      break;
  };
});

//This's the popup which don't allow to look at the page properly that's why I commented it
const bodyElement = document.querySelector(`body`);
//render(bodyElement, new PopupComponent().getElement(), RenderPosition.BEFOREEND);

const buttonLoadMore = filmsPosterElement.getElement().querySelector(`.films-list__show-more`);
buttonLoadMore.addEventListener(`click`, () => {
  const showedCards = showingCardCount;
  showingCardCount += CARD_COUNT_BY_BUTTON;

  cards.slice(showedCards, showingCardCount).forEach((card) => {
    return render(filmsPosterElement.getElement(), new CardComponent(card).getElement(), RenderPosition.BEFOREEND);
  });

  if (showingCardCount >= cards.length) {
    buttonLoadMore.remove();
  }
});

const totalFilms = document.querySelector(`.footer__statistics p`);
totalFilms.textContent = `${cards.length} movies inside`;
