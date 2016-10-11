"use strict";
/*
The file is concerned about maintaining the angular
part of the app
*/
var invApp = angular.module('invertedIndex', []);


invApp.controller('invertedController', ['$scope', function($scope){
  $scope.uploadedFiles = {};
  $scope.getIndex = function() {
    var invIndex = new Index();
    var fileChoice = $scope.uploadSelected;
    if(invIndex.createIndex($scope.uploadedFiles[fileChoice])) {
      var indexes = invIndex.getIndex();
      if (indexes.length === 0) {
        alert('Your documents must have title and text');
      } else {
        $scope.indexes = indexes;
      }
      $scope.documents = invIndex.getDocuments();
    } else {
      alert('Your json document must not be empty');
    }
    
  }

  document.getElementById('uploadfile').addEventListener('change', readJson);

  /**
  readJson function is used to read the content of a file
  @param {object} dom is an object representing the dom element the change event
  was added to
  */
  function readJson(dom) {
    var fileDetails = dom.target.files[0];
    //check if filename ends in json
    if(!fileDetails.name.match(/\.json$/)) {
      alert('Invalid file. You can only upload JSON');
    } else {
      var readFile = new FileReader();
      readFile.readAsText(fileDetails);
      readFile.onload = function(file) {
        var content = file.target.result;
        try {
          $scope.uploadedFiles[fileDetails.name] = JSON.parse(content);
          //to make angular update the view
          $scope.$apply();
        } catch(e) {
          alert('There is an error, with the json file');
        }
        
      }
    }
  }
}]);
