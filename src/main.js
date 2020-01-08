import RankComponent from './components/user-rank/index';
import FilterComponent from './components/filters/index';
import ContainerComponent from './components/film-container/index';
import PageController, {renderCards, showingCardCount} from './controllers/page';
import FilterController from './controllers/filter';
import MoviesModel from './models/movies';
import {generateCards} from './mocks/card';
import {generateFilters} from './mocks/filter';
import {getRandomNumber} from './utils/common';
import {render, RenderPosition, replaceSort} from './utils/render';

const FILM_COUNT = 15;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

// Randomly generate a number for getting Rate of user
const randomRate = getRandomNumber(90);
render(headerElement, new RankComponent(randomRate), RenderPosition.BEFOREEND);

const cards = generateCards(FILM_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setCards(cards);

const filterController = new FilterController(mainElement, moviesModel);
filterController.render();

const containerComponent = new ContainerComponent();
render(mainElement, containerComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(containerComponent, moviesModel);

pageController.render();

replaceSort(mainElement);

const totalFilms = document.querySelector(`.footer__statistics p`);
totalFilms.textContent = `${cards.length} movies inside`;
