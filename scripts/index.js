'use strict';
/* global bookmarkList, $ */

$(document).ready(function() {
  // bookmarkList.onLoad();
  bookmarkList.bindEventListeners();
  bookmarkList.onLoad();
});