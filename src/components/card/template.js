import {formateDateToYear } from '../../utils/common';
import {convertTime} from '../statistics/template';

export const getFormatedRuntime = (minutes)=>  {
  const duration = convertTime(minutes);

  return `${duration.hours}h ${duration.minutes}m`;
};

export const createFilmCardTempalate = (card) => {
  const {id, comments} = card;
  const {title, total_rating, genre, runtime, poster, description} = card.filmInfo
  const {watchlist, already_watched, favorite} = card.userDetails;
  const {date} = card.filmInfo.release;

  const duration = getFormatedRuntime(runtime);

  return (
    `<article class="film-card" id="${id}">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${total_rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${formateDateToYear(date)}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src=${poster} alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments.length} ${comments.length === 1 ? `comment` : `comments`}</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${already_watched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
  );
};
