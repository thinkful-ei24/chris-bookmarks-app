/* global store, api */
'use strict';

const bookmarkList = (function(){

  function generateError(err) {
    let message = '';
    if(err.responseJSON && err.resonseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }
    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }

// base for generateBookmarkListString finished
  // function generateBookmarkListString(bookmarkList) {
  //   const items = bookmarkList.map((item) => generateBaseHtml(item));
  //   return items.join('');
  // } 

  // base of render started
  // function render() {
  //   if(store.error) {
  //     const e1 = generateError(store.error);
  //     $('.error-container').html(e1);
  //   } else {
  //     $('.error-container').empty();
  //   }

    //sort by stars
    
  function handleNewItemSubmit() {
    $('#submit').submit(function (event) {
      event.preventDefault();
      const newTitle = $('.js-bookmark-list-title').val();
      const newUrl = $('.js-bookmark-list-url').val();
      const newDescription = $('.js-bookmark-list-description').val();
    }
  }
  return {

  };

}());