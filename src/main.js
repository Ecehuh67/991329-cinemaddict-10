import RankComponent from './components/user-rank/index';
import {MenuItem} from './components/filters/index';
import ContainerComponent from './components/film-container/index';
import PageController from './controllers/page';
import FilterController from './controllers/filter';
import MoviesModel from './models/movies';
import StatisticsComponent from './components/statistics/index';
import API from './api.js';
import {getRandomNumber, getRank} from './utils/common';
import {render, RenderPosition, replaceSort} from './utils/render';

const AUTHORIZATION = `Basic eo0w590ik29889a`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;


const previewMessage = document.querySelector(`.main_preview`);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

const api = new API(END_POINT, AUTHORIZATION);
const moviesModel = new MoviesModel();

const randomRate = getRandomNumber(25);
const statisticsComponent = new StatisticsComponent({model: moviesModel, rank: getRank(randomRate)});
render(headerElement, new RankComponent(randomRate), RenderPosition.BEFOREEND);

const containerComponent = new ContainerComponent();
const pageController = new PageController(containerComponent, moviesModel, api);

const filterController = new FilterController(mainElement, moviesModel);

render(mainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

filterController.showScreen((menuItem) => {

  switch (menuItem) {
    case MenuItem.ALL:
    case MenuItem.WATCHLIST:
    case MenuItem.HISTOTY:
    case MenuItem.FAVORITES:
      statisticsComponent.hide();
      pageController.show();
      break;
    case MenuItem.STATS:
      statisticsComponent.show();
      pageController.hide();
      break;
  }
});

api.getCards()
  .then((cards) => {
    previewMessage.remove();
    moviesModel.setCards(cards);
    filterController.render();
    pageController.render();

    render(mainElement, containerComponent, RenderPosition.BEFOREEND);
    replaceSort(mainElement);


    const totalFilms = document.querySelector(`.footer__statistics p`);
    totalFilms.textContent = `${moviesModel.getAllCards().length} movies inside`;
  });
