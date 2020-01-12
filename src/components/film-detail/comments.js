import {getRandomNumber} from '../../utils/common';

export const createCommentsMarkup = (comments, emoji) => {

  let emojiList = new Array(comments.length).fill(`smile.png`);

  if (emoji) {
    emojiList[comments.length - 1] = emoji;
  }

  return (comments
    .map(({text, author, date}, i) => {
      const id = getRandomNumber(100000);

      return (
        `<li class="film-details__comment" data-id="${id}">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emojiList[i]}" width="55" height="55" alt="emoji">
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
  // comments
  //   .map(({text, author, date}) => {
  //     let emojiImage = new Array(comments.length).fill(`smile.png`);
  //     const id = getRandomNumber(100000);
  //
  //     return (
  //       `<li class="film-details__comment" data-id="${id}">
  //         <span class="film-details__comment-emoji">
  //           <img src="./images/emoji/${emojiImage}" width="55" height="55" alt="emoji">
  //         </span>
  //         <div>
  //           <p class="film-details__comment-text">${text}</p>
  //           <p class="film-details__comment-info">
  //             <span class="film-details__comment-author">${author}</span>
  //             <span class="film-details__comment-day">${date}</span>
  //             <button class="film-details__comment-delete">Delete</button>
  //           </p>
  //         </div>
  //       </li>`
  //     )
  //   });
