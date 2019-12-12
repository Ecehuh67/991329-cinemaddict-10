import {
  getRandomArrayItem, getRandomArray, getRandomNumberPointNotation, getRandomArrayNumber, getTime, getRandomNumber
} from './utils';

import {filmsList, postersList, descriptionsOfFilm, genres} from './consts';

const generateCard = () => {
  const randomLengthArray = getRandomArray(descriptionsOfFilm);

  return {
    title: getRandomArrayItem(filmsList),
    rate: getRandomNumberPointNotation(Math.random() * 10),
    year: getRandomArrayNumber(1900, 2020),
    duration: getTime(),
    genre: getRandomArrayItem(genres),
    poster: getRandomArrayItem(postersList),
    description: descriptionsOfFilm.slice(randomLengthArray[0], randomLengthArray[1]),
    comments: getRandomNumber(10),
    isFavorites: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isLookingThrough: Math.random() > 0.5
  };
};

export const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};
