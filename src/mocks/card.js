import {
  getRandomArrayItem, getRandomArray, getRandomNumberPointNotation, getRandomArrayNumber, getTime, getRandomNumber
} from '../utils/common';

import {filmsList, postersList, descriptionsOfFilm, genres, comments} from './consts';
import {formateDate} from '../utils/common';

const randomLengthArray = getRandomArray(descriptionsOfFilm);
const randomGenres = getRandomNumber(genres.length - 1);

const generateComments = (commentaries) =>
  commentaries
  .slice(getRandomArrayNumber(0, commentaries.length))
  .map((comment) =>
    ({
      text: comment,
      author: `Karl Lindstrom`,
      date: formateDate(new Date())
    })
  );

const generateCard = () => {
  const commentsList = generateComments(comments);

  return {
    title: getRandomArrayItem(filmsList),
    rate: getRandomNumberPointNotation(Math.random() * 10),
    year: getRandomArrayNumber(1900, 2020),
    duration: getTime(),
    genre: genres.slice(randomGenres, randomGenres + 3),
    poster: getRandomArrayItem(postersList),
    description: descriptionsOfFilm.slice(randomLengthArray[0], randomLengthArray[1]).join(`\n`),
    isAddedToWatch: Math.random() > 0.5,
    isWatched: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    comments: commentsList,
    commentCount: commentsList.length,
    userRating: getRandomNumber(9),
    id: getRandomNumber(100000),
    emoji: null
  };
};

export const generateCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateCard);
};
