import {createDetailInfoTemplate} from './components/detail.js';
import {createUserRankTemplate} from './components/user-rank.js';
import {createFiltersTemplate} from './components/filters.js';
import {createSortTemplate} from './components/sort.js';
import {createFilmsPosterTemplate} from './components/poster.js';
import {createFilmCardTempalate} from './components/card.js';
import {generateCards} from './mocks/card.js';
import {generateFilters} from './mocks/filter.js';
import {getRandomNumber, getTopRatedFilms, getMostCommentedFilms} from './mocks/util.js';
import {createShowButtonTemplate} from './components/show-more-button.js';
import {createTopRatedTemplate} from './components/top-rated.js';
import {createMostCommentedTemplate} from './components/most-comment.js';
import {createContainerPageTemplate} from './components/film-container.js';


const FILM_COUNT = 15;
const SHOWING_CARD = 5;
const CARD_COUNT_BY_BUTTON = 5;
const FILM_POPULAR = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const headerElement = document.querySelector(`.header`);

// Randomly generate a number for getting Rate of user
const randomRate = getRandomNumber(90);
render(headerElement, createUserRankTemplate(randomRate), `beforeend`);

const cards = generateCards(FILM_COUNT);
const filters = generateFilters(cards);

const mainElement = document.querySelector(`.main`);

render(mainElement, createFiltersTemplate(filters), `beforeend`);
render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createContainerPageTemplate(), `beforeend`);

const filmsContainerElement = mainElement.querySelector(`.films`);
render(filmsContainerElement, createFilmsPosterTemplate(), `beforeend`);

const filmsPosterElement = filmsContainerElement.querySelector(`.films-list__container`);
let showingCardCount = SHOWING_CARD;
cards.slice(0, showingCardCount).forEach((card) => render(filmsPosterElement, createFilmCardTempalate(card), `beforeend`));

const filmsWrapperElement = filmsContainerElement.querySelector(`.films-list`);
render(filmsWrapperElement, createShowButtonTemplate(), `beforeend`);

render(filmsContainerElement, createTopRatedTemplate(), `beforeend`);
render(filmsContainerElement, createMostCommentedTemplate(), `beforeend`);
const ratedContainerElements = filmsContainerElement.querySelectorAll(`section.films-list--extra > .films-list__container`);


Array.from(ratedContainerElements).forEach((it) => {
  switch(it.previousElementSibling.firstChild.data) {
    case `Top rated`:
      getTopRatedFilms(cards, FILM_POPULAR).forEach((card) => render(it, createFilmCardTempalate(card), `beforeend`));
      break;
    case `Most commented`:
      getMostCommentedFilms(cards, FILM_POPULAR).forEach((card) => render(it, createFilmCardTempalate(card), `beforeend`));
      break;
  };
});

// This's the popup which don't allow to look at the page properly that's why I commented it
const bodyElement = document.querySelector(`body`);
//render(bodyElement, createDetailInfoTemplate(), `beforeend`);

const buttonLoadMore = filmsWrapperElement.querySelector(`.films-list__show-more`);
buttonLoadMore.addEventListener(`click`, () => {
  const showedCards = showingCardCount;
  showingCardCount += CARD_COUNT_BY_BUTTON;

  cards.slice(showedCards, showingCardCount).forEach((card) => {
    return render(filmsPosterElement, createFilmCardTempalate(card), `beforeend`);
  });

  if (showingCardCount >= cards.length) {
    buttonLoadMore.remove();
  }
});

const totalFilms = document.querySelector(`.footer__statistics p`);
totalFilms.textContent = `${cards.length} movies inside`;
