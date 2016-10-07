"use strict";

var Index = function() {

  /**
    createIndex function is used to get all the index
    @param {string} filepath- the path to the json file
  */
  this.createIndex = function(filepath) {
    jsonData = this.readJsonFile(filepath);
    //checks if the jsondata is accurate and not empty
    if(jsonData === null || jsonData.length === 0) {
      return false;
    }

    var textArray = [], documentNum = 0, newData = [];
    this.invalidDocuments = [];
    //loop through each doc in the json
    for(var eachIndex in jsonData) {
      var aDocument = jsonData[eachIndex];
      //check if each doc has the text and title property
      if(aDocument.hasOwnProperty('text') && 
        aDocument.hasOwnProperty('title')) {
          //convert the string of both title and text into array
          //and keep track of the document number
          var textTokens = this.tokenize(aDocument.text + " " + aDocument.title);
          textArray.push({documentNum, textTokens});
      } else {
        // keeping track of invalid documents
        this.invalidDocuments.push(documentNum);
      }
      documentNum++;
    }

    this.wordIndex = this.constructIndex(textArray);
  }

  /**
    tokenize: method converts the text to lowercase and then returns the
    array of words
    @param {string} text- the text to be tokenized
  */
  this.tokenize = function(text) {
    text = text.replace(/[.,\/#!$%\^&\*;:'{}=\-_`~()]/g, "");
    return text.toLowerCase().split(" ");
  }

  /**
    constructIndex method searches through the array of documents objects
    and identifies the words in each
    @param {array} documents - array of objects with each obect representing
    a document


  */
  this.constructIndex = function(documents) {
    var indexDict = {};
    for(var each in documents) {
      var tokenArray = documents[each].textTokens;
      for(var i = 0; i < tokenArray.length; i++){
        var token = tokenArray[i];
        //check if the word has already been indexed
        if(!indexDict.hasOwnProperty(token)) {
          indexDict[token] = [documents[each].documentNum];
        } else {
          //if the word has already been indexed
          //a check is run to confirm if the document has been indexed
          //with the word
          if(indexDict[token].indexOf(documents[each].documentNum) === -1) {
            indexDict[token].push(documents[each].documentNum);
          }
        }
      }
    }

    return indexDict;
  }

  /**
  getIndex method returns the indexed words and the documents they were found
  @return {Object} the words index
  */
  this.getIndex = function() {
    return this.wordIndex;
  }

  /**
  searchIndex searches the indexed words to determine the documents that the
  searchterms can be found
  @params searchTerm {string, array} the search query
  @return {object} each index is each searcykeyword. Each with an array value
  of the document index
  */
  this.searchIndex = function(searchTerm) {
    var indexToSearch = this.getIndex(), result = {};
    //if it is a string of search terms then a split can be done
    if(typeof searchTerm === 'string') {
      var searchTokens = this.tokenize(searchTerm);
    }
    for(var indexCount in searchTokens) {
      for(var eachToken in indexToSearch) {
        //does the indexed token contain the searchkeyword
        if(eachToken.includes(searchTokens[indexCount])) {
          result[searchTokens[indexCount]] = indexToSearch[eachToken];
          break;
        }
      }
    }
    return result;
  }

  this.readJsonFile = function(path) {
    //create xmlhttprequest to read file
    var request = new XMLHttpRequest();
    //once the ready state change, the function (callback) is executed
    request.onreadystatechange = function() {
      //is request completed and was it successful
      if(request.readystate === XMLHttpRequest.DONE && request.status === 200) {
        console.log(JSON.parse(request.responseText));
      }
    };
    request.open('GET', path, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
  }
};