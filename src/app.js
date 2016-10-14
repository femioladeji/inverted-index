"use strict";
/*
The file is concerned about maintaining the angular
part of the app
*/
let invApp = angular.module("invertedIndex", []);


invApp.controller('invertedController', ['$scope', function($scope){
  let invIndex = new Index();
  $scope.uploadedFiles = {};
  $scope.allFlag = false;
  $scope.allFilesIndexed = {};
  /**
  $scope.getIndex is executed when the getIndex button is clicked
  */
  $scope.getIndex = function() {
    let fileChoice = $scope.uploadSelected;
    if (fileChoice === undefined) {
      alert('Select a file to get index');
    }

    if(invIndex.createIndex($scope.uploadedFiles[fileChoice].text, fileChoice)) {
      let indexes = invIndex.getIndex(fileChoice);
      $scope.indexDisplay = true;
      $scope.indexed = [
        {
          indexes: indexes,
          documents: invIndex.getDocuments(fileChoice),
          indexedFile: fileChoice
        }
      ];

      $scope.allFilesIndexed[fileChoice] = true;

      //to check if two files or above have been uploaded
      //so that an option to search all files can be added
      if(Object.keys($scope.allFilesIndexed).length > 1) {
        $scope.allFlag = true;
      }

    } else {
      // the file was not indexed because it is invalid;
      delete $scope.uploadedFiles[fileChoice];
      alert('Your json file is invalid, make sure each element has title \
        and text property');
    }
    
  };

  $scope.searchIndex = function() {
    let fileChoice = $scope.uploadToSearch;
    $scope.searchQuery = $scope.searchTerm;
    if(!$scope.uploadedFiles.hasOwnProperty(fileChoice) && fileChoice !== 'all') {
      alert('The file has not been indexed');
      return false;
    }

    let result = invIndex.searchIndex($scope.searchQuery, fileChoice);
    
    if(!result) {
      alert('Invalid search query');
      return false;
    }

    $scope.indexed = result;
    $scope.indexDisplay = false;
  };

  document.getElementById('uploadfile').addEventListener('change', readJson);

  /**
  readJson function is used to read the content of a file
  @param {object} dom is an object representing the dom element the change event
  was added to
  */
  function readJson(dom) {
    let fileDetails = dom.target.files[0];
    //check if filename ends in json
    if(!fileDetails.name.match(/\.json$/)) {
      alert('Invalid file. You can only upload JSON');
    } else {
      let readFile = new FileReader();
      readFile.readAsText(fileDetails);
      readFile.onload = function(file) {
        let content = file.target.result;
        try {
          JSON.parse(content);
        } catch(e) {
          alert('Invalid JSON file');
          return false;
        }
        $scope.uploadedFiles[fileDetails.name] = {};
        $scope.uploadedFiles[fileDetails.name].text = content;
        
        //to make angular update the view
        $scope.$apply();
      };
    }
  }
}]);
