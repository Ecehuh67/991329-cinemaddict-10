import {getRandomNumber} from '../../utils/common';

export const createCommentsMarkup = (comments, emoji) => {

  let emojiList = new Array(comments.length).fill(`smile.png`);

  if (emoji) {
    emojiList[comments.length - 1] = emoji;
  }

  return (comments
    .map(({text, author, date, emojiImage}) => {

      return (
        `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emojiImage ? emojiImage : `smile.png`}" width="55" height="55" alt="emoji">
          </span>
          <div>
            <p class="film-details__comment-text">${text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${date}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`
      )
    }));
}