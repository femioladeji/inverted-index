"use strict";
/*
The file is concerned about maintaining the angular
part of the app
*/
var invApp = angular.module('invertedIndex', []);


invApp.controller('invertedController', ['$scope', function($scope){
  $scope.uploadedFiles = {};
  $scope.allFlag = false;
  var invIndex = new Index();
  $scope.getIndex = function() {
    var fileChoice = $scope.uploadSelected;
    if (fileChoice === undefined) {
      alert('Select a file to get index');
      return false;
    }

    if(invIndex.createIndex($scope.uploadedFiles[fileChoice].text, fileChoice)) {
      var indexes = invIndex.getIndex(fileChoice);
      if (indexes.length === 0) {
        alert('Your file must have title and text');
        return false;
      }
      $scope.indexes = indexes;
      $scope.documents = invIndex.getDocuments(fileChoice);
      $scope.indexDisplay = true;
      $scope.indexedFile = fileChoice;
    } else {
      alert('Your json file must not be empty');
    }
    
  }

  $scope.searchIndex = function() {
    var fileChoice = $scope.uploadToSearch;
    $scope.searchQuery = $scope.searchTerm;
    if(!$scope.uploadedFiles.hasOwnProperty(fileChoice) && fileChoice != 'all') {
      alert('The file has not been indexed');
      return false;
    }
    var result;
    if(fileChoice === 'all') {
    } else {
      result = $scope.uploadedFiles[fileChoice]['indexObject'].searchIndex($scope.searchQuery);
    }

    
    if(!result) {
      alert('Invalid search query');
      return false;
    }
    $scope.indexes = result;
    $scope.indexDisplay = false;
    $scope.searchedFile = fileChoice;
    // $scope.$apply();
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
          JSON.parse(content);
        } catch(e) {
          alert('Invalid JSON file');
          return false;
        }
        $scope.uploadedFiles[fileDetails.name] = {};
        $scope.uploadedFiles[fileDetails.name].text = content;
        //to check if two files or above have been uploaded
        //so that an option to search all files can be added
        if(Object.keys($scope.uploadedFiles).length > 1) {
          $scope.allFlag = true;
        }
        //to make angular update the view
        $scope.$apply();
      }
    }
  }
}]);
