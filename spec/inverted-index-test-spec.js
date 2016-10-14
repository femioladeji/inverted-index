"use strict";

describe('Read book data', function() {
  beforeEach(function() {
    this.indexInstance = new Index();
  });

  it('should return false if an invalid JSON array was read', function() {
    var indexed = this.indexInstance.createIndex('invalid json as a string', 'invalid.json');
    expect(indexed).toBeFalsy();
  });

  it('should return false if an empty json was read', function() {
    var indexed = this.indexInstance.createIndex([], 'invalid.json');
    expect(indexed).toBeFalsy();
  });
});

describe('Populate Index', function() {
  var valid, invalid;
  beforeEach(function() {
    this.indexInstance = new Index();
    valid = '[{"title": "The hill","text": "Some may trust in"},{"title": \
    "Travis","text": "The travis in CI is not in."}]';
    invalid = '[{"text": "Some may trust in"},{"title": "Travis"}]';
  });

  it('should create index once the json file has been read', function() {
    this.indexInstance.createIndex(valid, 'valid.json');
    expect(this.indexInstance.getIndex('valid.json')).toBeDefined();
  });

  it('should return the right index value if a valid json is passed',
    function () {
      this.indexInstance.createIndex(valid, 'valid.json');
      var indexed = this.indexInstance.getIndex('valid.json');
      var answer = {
        'some': [0],
        'the': [0, 1],
        'hill': [0],
        'may': [0],
        'in': [0, 1],
        'travis': [1],
        'ci': [1],
        'is': [1],
        'not': [1],
        'trust': [0]
      };
      expect(indexed).toEqual(answer);
  });

  it('should add a property invalidDocuments if some docs don\'t have title or text',
    function() {
      var indexed = this.indexInstance.createIndex(invalid, 'invalid.json');
      expect(indexed).toBeFalsy();
    });
});

describe('Search index', function() {
  beforeEach(function() {
    this.indexInstance = new Index();
  });

  it('should return an array of object(s) with each word as keys and the value is an \
    array of the document index', function() {
      var book = '[{"title": "The hill","text": "Some may trust in"}, \
      {"title": "Travis", "text": "The travis in CI is not in"}]';

      this.indexInstance.createIndex(book, 'book.json');
      var result = this.indexInstance.searchIndex('in Trav', 'book.json');
      var expectedResult = [
        {
          indexes: {'in':[0,1], 'travis':[1]},
          searchedFile: 'book.json',
          documents: [0, 1]
        }
      ];
      expect(result).toEqual(expectedResult);
  });

  it('should return false if an empty string is passed as search query',
    function() {
      var book = "[{'title': 'The hill', 'text': 'Some may trust in'}, \
          {'title': 'Travis', 'text': 'The travis in CI is not in'}]";
      this.indexInstance.createIndex(book, 'book.json');
      var result = this.indexInstance.searchIndex('    ');
      expect(result).toBeFalsy();
  });
});