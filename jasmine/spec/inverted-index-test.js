"use strict";

describe('Read book data', function() {
  beforeEach(function() {
    this.indexInstance = new Index();
  });

  it('should return false if an empty json was read', function() {
    var indexed = this.indexInstance.createIndex('df', [{}]);
    expect(indexed).toBeFalsy();
  });
});

describe('Populate Index', function() {
  beforeEach(function() {
    this.indexInstance = new Index();
  });

  it('should return the right index value if a valid json is passed',
    function () {
      this.indexInstance.createIndex('testfiles/valid.json');
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
      var indexed = this.indexInstance.createIndex('testfiles/invalid.json');
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
      this.indexInstance.createIndex('dfa', book);
      var result = this.indexInstance.searchIndex('in Trav');
      expect(result).toEqual({'in':[0,1], 'trav':[1]});
  });
})