"use strict";

var Index = function() {

  /**
    createIndex function is used to get all the index
    @param {object} jsonData- the json data to index
    @return {boolean} true or false if the createIndex was successful
  */
  this.createIndex = function(jsonData) {
    //checks if the jsondata is accurate and not empty
    if(jsonData === null || jsonData.length === 0) {
      return false;
    }
    this.prepareJsonData(jsonData);
    return true;
  }

  /**
  prepareJsonData gets the json ready for indexing by tokenizing the
  statements
  @param {object} jsonData - the jsonData that has been read from the file
  */
  this.prepareJsonData = function(jsonData) {

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
          //the documentNum is the index of the doc that has been tokenied
          textArray.push({documentNum, textTokens});
      } else {
        // keeping track of invalid documents
        this.invalidDocuments.push(documentNum);
      }
      documentNum++;
    }
    //saves the number of valid documents
    this.numOfDocs = documentNum;
    //adds the attribute wordIndex to the class instance if the constructIndex
    //was successful
    this.wordIndex = this.constructIndex(textArray);
  }

  /**
    tokenize: method converts the text to lowercase and then returns the
    array of words
    @param {string} text- the text to be tokenized
    @return {array} array of words in the documents
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
    @return {object} objects of tokens. Each token is a key in the object and
    contains an array of documents in which it was found
  */
  this.constructIndex = function(documents) {
    var indexDict = {};
    //loop through the documents
    for(var each in documents) {
      var tokenArray = documents[each].textTokens;
      for(var i = 0; i < tokenArray.length; i++){
        var token = tokenArray[i];
        //check if the word has not been indexed and used as key in the object
        if(!indexDict.hasOwnProperty(token)) {
          //the token is used as a key and initialized to an empty array
          indexDict[token] = [];
        }
        //a check is run to confirm if the document has been indexed
        //with the word
        if(indexDict[token].indexOf(documents[each].documentNum) === -1) {
          indexDict[token].push(documents[each].documentNum);
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
    var returnValue = this.wordIndex === undefined ? false : this.wordIndex;
    return returnValue;
  }

  /**
  searchIndex searches the indexed words to determine the documents that the
  searchterms can be found
  @params searchTerm {string, array} the search query
  @return {object|boolean} it returns boolean if the searchTerm is empty and 
  it retrns object if it is not. Each index is each searcykeyword.
  Each with an array value of the document index
  */
  this.searchIndex = function(searchTerm) {
    if((typeof searchTerm === 'string' && searchTerm.trim() === '') ||
      searchTerm.length === 0) {
        return false;
    }

    var indexToSearch = this.getIndex(), result = {};
    //if it is a string of search terms then a split can be done
    if(typeof searchTerm === 'string') {
      var searchTokens = this.tokenize(searchTerm);
    }
    for(var indexCount in searchTokens) {
      for(var eachToken in indexToSearch) {
        //does the indexed token contain the searchkeyword
        if(eachToken.includes(searchTokens[indexCount])) {
          result[eachToken] = indexToSearch[eachToken];
          break;
        }
      }
    }
    return result;
  }

  this.readJsonFile = function(path, callback) {
    //create xmlhttprequest to read file
    var request = new XMLHttpRequest();
    var this_ = this;
    //once the ready state change, the function (callback) is executed
    request.onreadystatechange = function() {
      //is request completed and was it successful
      if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        callback(JSON.parse(request.responseText));
      }
      
    };
    request.open('GET', path, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();
  }

  this.getDocuments = function() {
    var docs = [];
    for(var i = 0; i < this.numOfDocs; i++) {
      docs.push(i);
    }
    return docs;
  }
};