(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
const valid = require('./testfiles/valid.json'),
      invalid = require('./testfiles/invalid.json');

describe('Inverted Index class', function() {
  beforeEach(function() {
    this.indexInstance = new Index();
    this.valid = valid;
    this.invalid = invalid;
  });

  describe('Read book data', function() {

    it('should return false if an invalid JSON array was read', function() {
      let indexed = this.indexInstance.createIndex('invalid json as a string',
        'invalid.json');
      expect(indexed).toBeFalsy();
    });

    it('should return false if an empty json was read', function() {
      let indexed = this.indexInstance.createIndex([], 'invalid.json');
      expect(indexed).toBeFalsy();
    });
  });

  describe('Populate Index', function() {
    it('should create index once the json file has been read', function() {
      this.indexInstance.createIndex(this.valid, 'valid.json');
      expect(this.indexInstance.getIndex('valid.json')).toBeDefined();
    });

    it('should return the right index value if a valid json is passed',
      function () {
        this.indexInstance.createIndex(this.valid, 'valid.json');
        let indexed = this.indexInstance.getIndex('valid.json');
        let answer = {
          some: [0],
          the: [0, 1],
          hill: [0],
          may: [0],
          in: [0, 1],
          travis: [1],
          ci: [1],
          is: [1],
          not: [1],
          trust: [0]
        };
        expect(indexed).toEqual(answer);
    });

    it('should return false if some docs don\'t have title or text',
      function() {
        let indexed = this.indexInstance.createIndex(this.invalid, 'invalid.json');
        expect(indexed).toBeFalsy();
      });
  });

  describe('Search index', function() {

    it('should return an array of object(s) with each word as keys and the \
      value is an array of the document index', function() {
        let book = this.valid;

        this.indexInstance.createIndex(book, 'book.json');
        let result = this.indexInstance.searchIndex('in Travis', 'book.json');
        let expectedResult = [
          {
            indexes: {in:[0,1], travis:[1]},
            searchedFile: 'book.json',
            documents: [0, 1]
          }
        ];
        expect(result).toEqual(expectedResult);
    });

    it('should return an array of search result for each file if the \
      file searched is all', function() {
        let book1 = this.valid;

        let book2 = this.valid;

        this.indexInstance.createIndex(book1, 'book1.json');
        this.indexInstance.createIndex(book2, 'book2.json');
        let expectedResult = [
          {
            documents: [0, 1],
            indexes: {
              the: [0,1]
            },
            searchedFile: 'book1.json'
          },
          {
            documents: [0, 1],
            indexes: {
              the: [0,1]
            },
            searchedFile: 'book2.json'
          }
        ];
        let result = this.indexInstance.searchIndex('the', 'all');
        expect(result).toEqual(expectedResult);
      });

    it('should return false if an empty string is passed as search query',
      function() {
        let book = this.valid;
        this.indexInstance.createIndex(book, 'book.json');
        let result = this.indexInstance.searchIndex('   ');
        expect(result).toBeFalsy();
    });
  });
});
},{"./testfiles/invalid.json":2,"./testfiles/valid.json":3}],2:[function(require,module,exports){
module.exports=[
  {
    "text": "Some may trust in"
  },

  {
    "title": "Travis"
  }
]
},{}],3:[function(require,module,exports){
module.exports=[
  {
    "title": "The hill",
    "text": "Some may trust in"
  },

  {
    "title": "Travis",
    "text": "The travis in CI is not in."
  }
]

},{}]},{},[1]);
