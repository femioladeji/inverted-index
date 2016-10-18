"use strict";

const hasProperty = Object.prototype.hasOwnProperty;

class Index{
  constructor() {
    // an empty object that keeps track of files uploaded
    // and their index
    this.filesIndexed = {};
  }
  

  /**
    createIndex function is used to get all the index
    @param {object} jsonData- the json data to index
    @parame {string} filename- the name of the file to be indexed
    @return {boolean} true or false if the createIndex was successful
  */
  createIndex(jsonData, filename) {
    //checks if the jsondata is accurate and not empty
    try {
      jsonData = JSON.parse(jsonData);
    } catch(e) {
      return false;
    }

    //adds the filename as a key to the filesIndex and
    //initializes it to an empty object
    this.filesIndexed[filename] = {};
    if(!this.prepareJsonData(jsonData, filename)) {
      //if the file was not indexed, the key is removed
      delete this.filesIndexed[filename];
      return false;
    }
    return true;

  }

  /**
  prepareJsonData gets the json ready for indexing by tokenizing the
  statements
  @param {object} jsonData - the jsonData that has been read from the file
  @param {string} filename - the name of the file uploaded 
  */
  prepareJsonData(jsonData, filename) {

    let textArray = [], documentNum = 0;
    //loop through each doc in the json
    let aDocument = [];
    for(let eachIndex in jsonData) {
      aDocument = jsonData[eachIndex];
      //check if each doc has the text and title property
      if(hasProperty.call(aDocument, "text") &&
        hasProperty.call(aDocument, "title")) {
          //convert the string of both title and text into array
          //and keep track of the document number
          let textTokens = this.tokenize(aDocument.text + " " + aDocument.title);
          //the documentNum is the index of the doc that has been tokenied
          textArray.push({documentNum, textTokens});
      } else {
        return false;
      }
      documentNum++;
    }
    //saves the number of documents
    this.filesIndexed[filename].numOfDocs = documentNum;
    //adds the attribute wordIndex to the class instance if the constructIndex
    //was successful
    this.filesIndexed[filename].index = this.constructIndex(textArray);

    return true;
  }

  /**
    tokenize: method converts the text to lowercase and then returns the
    array of words
    @param {string} text- the text to be tokenized
    @return {array} array of words in the documents
  */
  tokenize(text) {
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
  constructIndex(documents) {
    let indexDict = {};
    //loop through the documents
    for(let each in documents) {
      let tokenArray = documents[each].textTokens;
      for(let i = 0; i < tokenArray.length; i++){
        let token = tokenArray[i];
        //check if the word has not been indexed and used as key in the object
        if(!hasProperty.call(indexDict, token)) {
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
  @filename {string} name of the file to get its index
  @return {Object} the words index
  */
  getIndex(filename) {
    let returnValue = this.filesIndexed[filename].index === undefined ? false : this.filesIndexed[filename].index;
    return returnValue;
  }

  /**
  searchIndex searches the indexed words to determine the documents that the
  searchterms can be found
  @params searchTerm {string, array} the search query
  @params filename {string}- the name of the file to search its index
  @return {object|boolean} it returns boolean if the searchTerm is empty and
  it retrns object if it is not. Each index is each searcykeyword.
  Each with an array value of the document index
  */
  searchIndex(searchTerm, filename) {
    if((typeof searchTerm === "string" && searchTerm.trim() === "") ||
      (typeof searchTerm === "object" && searchTerm.length === 0) ||
      searchTerm === undefined) {
        return false;
    }

    let result = [];
    if(filename === "all") {
      for(let eachFile in this.filesIndexed) {
        result.push({
          indexes: this.getSearchResults(searchTerm, eachFile),
          searchedFile: eachFile,
          documents: this.getDocuments(eachFile)
        });
      }
    } else {
      result.push({
        indexes: this.getSearchResults(searchTerm, filename),
        searchedFile: filename,
        documents: this.getDocuments(filename)
      });
    }
    return result;
  }

  /**
  getSearchResults method checks the index of the file and
  returns the result
  @param searchTokens {string or array} - the search query can be a string
  or an array
  @param filename {string} - the name of the file
  @return {object} - an object with the found words as keys
  */
  getSearchResults(searchTokens, filename) {
    let indexToSearch = this.getIndex(filename), result = {};
    //if it is a string of search terms then a split can be done
    if(typeof searchTokens === "string") {
      searchTokens = this.tokenize(searchTokens);
    }
    for(let indexCount in searchTokens) {
      for(let eachToken in indexToSearch) {
        //does the indexed token contain the searchkeyword
        if(eachToken === searchTokens[indexCount]) {
          result[eachToken] = indexToSearch[eachToken];
          break;
        }
      }
    }
    return result;
  }

  // this.readJsonFile = function(path, callback) {
  //   //create xmlhttprequest to read file
  //   let request = new XMLHttpRequest();
  //   let this_ = this;
  //   //once the ready state change, the function (callback) is executed
  //   request.onreadystatechange = function() {
  //     //is request completed and was it successful
  //     if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
  //       callback(JSON.parse(request.responseText));
  //     }
  //   };
  //   request.open('GET', path, true);
  //   request.setRequestHeader('Content-Type', 'application/json');
  //   request.send();
  // }

  /**
  getDocuments get an array of the documents index e.g [0, 1, 2, 3]
  @param {string} - name of the file to get its document
  @return {array} an array of the documents index
  */
  getDocuments(filename) {
    let docs = [];
    for(let i = 0; i < this.filesIndexed[filename].numOfDocs; i++) {
      docs.push(i);
    }
    return docs;
  }
}