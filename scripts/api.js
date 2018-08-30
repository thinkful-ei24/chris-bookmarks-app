/* global store,bookmarkList, $ */

'use strict';


const API = (function(){

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/chris';



  const getItems = function(callback) {
    $.getJSON(BASE_URL + '/items', callback);
  };

  //createItem will need error passed in
  const createItem = function(name, success) {
    const newItem = JSON.stringify({name});
    $.ajax({
      url: BASE_URL + '/items',
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: success,
    });
  };

  const updateItem = function(id, updateData, callback) {
    $.ajax({
      url: BASE_URL + '/items/' + id,
      method: 'PATCH',
      contentType: 'application/json',
      data: updateData,
      success: callback
    });
  };

  const deleteItem = function(id, callback) {
    $.ajax({
      url: BASE_URL + '/items/' + id,
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

API.createItem("chris", 
    (newItem) => {
      store.addItem(newItem);
    });


