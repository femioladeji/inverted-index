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

  it('should return a correct object when a valid json was passed',
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
      var indexed = this.indexInstance.createIndex('dfa', book);
      var answer = {
        'some': [1],
        'the': [1, 2],
        'hill': [1],
        'may': [1],
        'in': [1, 2],
        'travis': [2],
        'ci': [2],
        'is': [2],
        'not': [2]
      };
      console.log(indexed);
      expect(indexed).toEqual(answer);
  });
});