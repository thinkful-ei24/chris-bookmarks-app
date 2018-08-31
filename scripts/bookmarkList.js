/* global store, api */
'use strict';

const bookmarkList = (function(){

  function generateErrorElement(message='') {
    console.log(message);
    return `
        <p>${message}</p>
    `;
  }
  function render(){
    console.log(store);
    $('#bookmark-list').html('');
    const visibleItems = store.items.filter(item => item.rating >= store.minRating);
    visibleItems.forEach(item => {
      const element = generateBookmarkListString(item);
      //attach element to ul in DOM
      $('#bookmark-list').append(element);

      if(store.error) {
        const error = generateErrorElement(store.error);
        console.log(error);
        $('.error-container').html(error);
      } else {
        $('.error-container').empty();
      }
    });
  }



  function generateBookmarkListString(item) {
    //build book item list element
    
    let expandedDiv = '';
    if(item.expanded){
      expandedDiv = `<div class="js-expanded">
    <p>${item.desc}</p>
    <button class="js-controls bookmark-list-delete">Delete Bookmark</button>
    <a href="${item.url}">Go to ${item.title}
    </a>
    </div>`;
    }
    
    return `
      <li class="js-item-element" data-item-id="${item.id}">
        ${item.title}
        <button class="js-controls bookmark-list-expand">Expand Button</button>
      ${expandedDiv}
      </li>
  `;
  }
 
  function onLoad(){
    API.getItems(response => {
      store.initializeStore(response);
      render();
    });
  }


  function handleDelete(){
    $('#bookmark-list').on('click', '.bookmark-list-delete', (event) => {
      const id = event.target.closest('li').getAttribute('data-item-id');
      API.deleteItem(id, function(){
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleExpand() {
    $('#bookmark-list').on('click', '.bookmark-list-expand', (event) => {
      const id = event.target.closest('li').getAttribute('data-item-id');
      store.toggleExpand(id);
      render();
      });
  }

  function handleFilterByRating(){
    $('#filter-by-rating').on('change', (event) => {
      const minimumRating = event.target.value;
      store.filterByMinimumRating(minimumRating);
      render();
    });
  }

  function handleStarSelected(){
    $('.star').click((event) => {
      $('.star.selected').removeClass('selected');
      $(event.target).addClass('selected');
      const rating = event.target.getAttribute('data-item-id'); // vanilla JS
      $('.star').each(function(i,item){
        if($(item).attr('data-item-id')<rating){
          $(item).addClass('selected');
        }
      });
      // const rating = $(this).attr('data-item-id');
      $('#rating').attr('value', rating);
    });
  }

  function handleError(error) {
    const message = error.responseJSON.message;
    store.setError(message);
    render();
  }
    
  function handleNewItemSubmit() {
    $('#js-bookmark-list-form').submit(function (event) {
      event.preventDefault();
      const rating = $('#rating').val();
      const newTitle = $('.js-bookmark-list-title').val();
      const newUrl = $('.js-bookmark-list-url').val();
      const newDescription = $('.js-bookmark-list-description').val();
      
      API.createItem(newTitle, newUrl, rating, newDescription,
        (newItem) => {
          store.setError(null);
          store.addItem(newItem);
          render();
        },
        (error) => {
          handleError(error);
        });
    });
  }

  function bindEventListeners() {
    handleNewItemSubmit();
    handleStarSelected();
    handleDelete();
    handleFilterByRating();
    handleExpand();
  }

  return {
    bindEventListeners: bindEventListeners,
    onLoad: onLoad,
    render: render
  };
}());