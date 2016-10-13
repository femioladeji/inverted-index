"use strict";

describe('Read book data', function() {
  beforeEach(function() {
    this.indexInstance = new Index();
  });

  it('should return false if an invalid JSON array was read', function() {
    var indexed = this.indexInstance.createIndex('invalid json as a string');
    expect(indexed).toBeFalsy();
  })

  it('should return false if an empty json was read', function() {
    var indexed = this.indexInstance.createIndex([]);
    expect(indexed).toBeFalsy();
  });
});

describe('Populate Index', function() {
  var valid, invalid;
  beforeEach(function() {
    this.indexInstance = new Index();
    valid = [
        {
          "title": "The hill",
          "text": "Some may trust in"
        },

        {
          "title": "Travis",
          "text": "The travis in CI is not in."
        }
      ];
      invalid = [
        {
          "text": "Some may trust in"
        },

        {
          "title": "Travis"
        }
      ];
  });

  it('should create index once the json file has been read', function() {
    this.indexInstance.createIndex(valid);
    expect(this.indexInstance.getIndex()).toBeDefined();
  });

  it('should return the right index value if a valid json is passed',
    function () {
      this.indexInstance.createIndex(valid);
      var indexed = this.indexInstance.getIndex();
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
      var indexed = this.indexInstance.createIndex(invalid);
      expect(this.indexInstance.invalidDocuments).toEqual([0,1]);
    });
});

describe('Search index', function() {
  beforeEach(function() {
    this.indexInstance = new Index();
  });

  it('should return an object with each word as keys and the value is an array of the document index',
    function() {
      var book = [
          {
            'title': 'The hill',
            'text': 'Some may trust in'
          },
          {
            'title': 'Travis',
            'text': 'The travis in CI is not in'
          }
        ];
      this.indexInstance.createIndex(book);
      var result = this.indexInstance.searchIndex('in Trav');
      expect(result).toEqual({'in':[0,1], 'travis':[1]});
  });

  it('should return false if an empty string is passed as search query', function() {
    var book = [
          {
            'title': 'The hill',
            'text': 'Some may trust in'
          },
          {
            'title': 'Travis',
            'text': 'The travis in CI is not in'
          }
        ];
      this.indexInstance.createIndex(book);
      var result = this.indexInstance.searchIndex('    ');
      expect(result).toBeFalsy();
  });
});