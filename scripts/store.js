'use strict';

const store = (function(){
  const setError = function(error) {
    this.error = error;
  };
  
  const addItem = function(item) {
    this.items.push(item);
    this.visibleItems = this.items;
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
    this.visibleItems = this.items;
  };

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
    this.visibleItems = this.items;
  };

  const filterByMinimumRating = function(minRating){
    this.visibleItems = this.items.filter(item => item.rating >= minRating);
  };


  
  
  return {
    items: [],
    visibleItems: [],
    error: null,
    addItem,
    findById,
    findAndUpdate,
    findAndDelete,
    filterByMinimumRating
  };

}());
