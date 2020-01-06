import {
  getRandomArrayItem, getRandomArray, getRandomNumberPointNotation, getRandomArrayNumber, getTime, getRandomNumber, generateComment
} from '../utils/common';

import {filmsList, postersList, descriptionsOfFilm, genres, comments} from './consts';

const generateCard = () => {
  const randomLengthArray = getRandomArray(descriptionsOfFilm);
  const randomGenres = getRandomNumber(genres.length - 1);

  return {
    title: getRandomArrayItem(filmsList),
    rate: getRandomNumberPointNotation(Math.random() * 10),
    year: getRandomArrayNumber(1900, 2020),
    duration: getTime(),
    genre: genres.slice(randomGenres, randomGenres + 3),
    poster: getRandomArrayItem(postersList),
    description: descriptionsOfFilm.slice(randomLengthArray[0], randomLengthArray[1]),
    isAddedToWatch: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    comments: getRandomNumber(10),
    popupComments: generateComment(comments)
  };
};

export const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};
