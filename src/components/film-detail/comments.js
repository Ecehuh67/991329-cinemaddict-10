import {getRandomNumber} from '../../utils/common';

export const createCommentsMarkup = (comments) =>
  comments
    .map(({text, author, date}) => {
      const id = getRandomNumber(100000);

      return (
        `<li class="film-details__comment" data-id="${id}">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">
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
    });
