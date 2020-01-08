import {Filters} from './consts';

const getAllCards = (cards) => cards;

const getWatchlistCards = (cards) => cards.filter((card) => card.isAddedToWatch);

const getHistoryCards = (cards) => cards.filter((card) => card.isWatched);

const getFavoritesCards = (cards) => cards.filter((card) => card.isFavorite);

export const getCardsByFilter = (cards, filterType) => {

  switch (filterType) {
    case Filters.ALL:
      return getAllCards(cards);
    case Filters.WATCHLIST:
      return getWatchlistCards(cards);
    case Filters.HISTORY:
      return getHistoryCards(cards);
    case Filters.FAVORITES:
      return getFavoritesCards(cards);
  }

  return cards;
};
