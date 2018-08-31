/* global store,bookmarkList, $ */

'use strict';


const API = (function(){

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/chris';
  


  const getItems = function(callback) {
    $.getJSON(BASE_URL + '/bookmarks', callback);
  };

  //createItem will need error passed in
  // const database = {
  //   title: title,
  //   url: url,
  //   rating: rating
  // };

  const createItem = function(title, url, rating, desc, success, error) {
    const newItem = JSON.stringify({title, url, rating, desc});
    console.log(newItem);
    $.ajax({
      url: BASE_URL + '/bookmarks',
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: success,
      error: error,  
    });
  };

  const updateItem = function(id, updateData, callback) {
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'PATCH',
      contentType: 'application/json',
      data: updateData,
      success: callback
    });
  };

  const deleteItem = function(id, callback) {
    $.ajax({
      url: BASE_URL + '/bookmarks/' + id,
      method: 'DELETE',
      success: callback
    });
  };

  

  return {
    getItems,
    createItem,
    updateItem,
    deleteItem,
  };
}());



