"use strict";

describe('Read book data', function() {

});

describe('Populate Index', function() {
  beforeEach(function() {
    this.indexInstance = new Index();
  });

  it('should return false if an empty json was read', function() {
    var indexed = this.indexInstance.createIndex('df', [{}]);
    expect(indexed).toBeFalsy();
  });

  it('should add property wordIndex if a valid json is passed',
    function () {
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
      var indexed = this.indexInstance.getIndex();
      var answer = {
        'some': [1],
        'the': [1, 2],
        'hill': [1],
        'may': [1],
        'in': [1, 2],
        'travis': [2],
        'ci': [2],
        'is': [2],
        'not': [2],
        'trust': [1]
      };
      expect(indexed).toEqual(answer);
  });

  it('should add a property invalidDocuments if some docs don\'t have title or text',
    function() {
      var book = [
        {
          'title': 'The hill',
        },
        {
          'text': 'The travis in CI is not in'
        }
      ];
      var indexed = this.indexInstance.createIndex('dfa', book);
      this.indexInstance.invalidDocuments.toEqual([1,2]);
    });
});

describe('Search index', function() {
  it('should return an array of indices of the word searched', function() {
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
    var result = this.indexInstance.searchIndex('in');
    expect(result).toEqual([0, 1]);
  });
})