const filters = [`All`, `Watchlist`, `History`, `Favorites`];


export const generateFilters = (cards) => {
  let index = 0;

  return filters.map((it) => {
    switch (it) {
      case `All`:
        index = cards.length;
        break;
      case `Watchlist`:
        index = cards.filter((card) => card.isWatched).length;
        break;
      case `History`:
        index = cards.filter((card) => card.isLookingThrough).length;
        break;
      case `Favorites`:
        index = cards.filter((card) => card.isFavorites).length;
        break;
    }

    return {
      title: it,
      count: index
    };
  });
};
