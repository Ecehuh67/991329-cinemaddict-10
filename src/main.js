import {createDetailInfoTemplate} from './components/detail.js';
import {createUserRankTemplate} from './components/user-rank.js';
import {createNavigationTemplate} from './components/navigation.js';
import {createFiltersTemplate} from './components/filter.js';
import {createFilmsPosterTemplate} from './components/poster.js';
import {createFilmCardTempalate} from './components/card.js';
import {createShowButtonTemplate} from './components/show-more-button.js';
import {createTopRatedTemplate} from './components/top-rated.js';
import {createMostCommentedTemplate} from './components/most-comment.js';
import {createContainerPageTemplate} from './components/film-container.js';


const FILM_COUNT = 5;
const FILM_POPULAR = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const fillContainer = (count, container, template, place) => {
  new Array(count)
    .fill(``)
      .forEach(
          () => {
            render(container, template, place);
          }
      );
};


const headerElement = document.querySelector(`.header`);
render(headerElement, createUserRankTemplate(), `beforeend`);

const mainElement = document.querySelector(`.main`);
render(mainElement, createNavigationTemplate(), `beforeend`);
render(mainElement, createFiltersTemplate(), `beforeend`);
render(mainElement, createContainerPageTemplate(), `beforeend`);

const filmsContainerElement = mainElement.querySelector(`.films`);
render(filmsContainerElement, createFilmsPosterTemplate(), `beforeend`);

const filmsPosterElement = filmsContainerElement.querySelector(`.films-list__container`);

fillContainer(FILM_COUNT, filmsPosterElement, createFilmCardTempalate(), `beforeend`);

const filmsWrapperElement = filmsContainerElement.querySelector(`.films-list`);
render(filmsWrapperElement, createShowButtonTemplate(), `beforeend`);

render(filmsContainerElement, createTopRatedTemplate(), `beforeend`);
render(filmsContainerElement, createMostCommentedTemplate(), `beforeend`);
const ratedContainerElements = filmsContainerElement.querySelectorAll(`section.films-list--extra > .films-list__container`);

ratedContainerElements.forEach(
    (el) => {
      fillContainer(FILM_POPULAR, el, createFilmCardTempalate(), `beforeend`);
    }
);

const bodyElement = document.querySelector(`body`);
render(bodyElement, createDetailInfoTemplate(), `beforeend`);
