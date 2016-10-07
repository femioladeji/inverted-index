"use strict";
var jsonData = [
      {
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
      },

      {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
      }
    ];


var Index = function() {

  /**
    createIndex function is used to get all the index
    @param {string} filepath- the path to the json file
  */
  this.createIndex = function(filepath) {
    if(jsonData === null || jsonData.length === 0) {
      return false;
    }

    var textArray = [], invalidDocs = [], documentNum = 1;

    for(var eachDoc in jsonData) {
      if(jsonData[eachDoc].hasOwnProperty('text') && 
        jsonData[eachDoc].hasOwnProperty('title')) {
          var textTokens = this.tokenize(jsonData[eachDoc].text);
          textArray.push({documentNum, textTokens});
      } else {
        invalidDocs.push(documentNum);
      }
      documentNum++;
    }

    var wordIndex = {}
  }

  /**
    tokenize: method converts the text to lowercase and then returns the
    array of words
    @param {string} text- the text to be tokenized
  */
  this.tokenize = function(text) {
    return text.toLowerCase().split(" ");
  }
};