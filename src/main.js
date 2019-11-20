'use strict';

const FILM_COUNT = 5;
const FILM_POPULAR = 2;

const createUserRankTemplate = () => {
  return `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

const createNavigationTemplate = () => {
  return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
};

const createFiltersTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;
};

const createContainerPageTemplate = () => {
  return `<section class="films"></section>`;
};

const createFilmsPosterTemplate = () => {
  return `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container"></div>
    </section>`;
};

const createFilmCardTempalate = () => {
  return `<article class="film-card">
    <h3 class="film-card__title">The Dance of Life</h3>
    <p class="film-card__rating">8.3</p>
    <p class="film-card__info">
      <span class="film-card__year">1929</span>
      <span class="film-card__duration">1h 55m</span>
      <span class="film-card__genre">Musical</span>
    </p>
    <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
    <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
    <a class="film-card__comments">5 comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`;
};

const createShowButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

const createTopRatedTemplate = () => {
  return `<section class="films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container"></div>
  </section>`;
};

const createMostCommentedTemplate = () => {
  return `<section class="films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container"></div>
  </section>`;
};

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
