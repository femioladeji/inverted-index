"use strict";
/*
The file is concerned about maintaining the angular
part of the app
*/
var invApp = angular.module('invertedIndex', []);

invApp.directive('fileModel', ['$parse', function($parse) {
    var fileModelObject = {
        restrict: 'A',
        /**
        link function is responsible for monitoring changes in the file field
        @param {object} scope
        @param {array} element - array of objects of all the input fields
        with file-model attribute
        @param {array} attrs - array of objects containing the attributes
        of the input fields that has the attribute file-model
        */
        link: function(scope, element, attrs) {
            // console.log(attrs);
            var theFile = $parse(attrs.fileModel);
            var modelSetter = theFile.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };

    return fileModelObject;
}]);

invApp.service('uploadfile', ['$http', function($http) {
    this.uploadFileUrl = function(file, uploadUrl) {
        var myFormData = new FormData;
        myFormData.append('uploadedjsonfile', file);
        $http.post(uploadFileUrl, myFormData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function() {

        })
        .error(function() {

        })
    };
}]);

invApp.controller('invertedController', function($scope){
    $scope.getIndex = function() {
        console.log('button clicked');
        var invIndex = new Index();
        var jsonData = [
      {
        "title": "Alice in Wonderland",
        "text": "Alice falls into a rabbit hole and enters a world full of imagination."
      },

      {
        "title": "The Lord of the Rings: The Fellowship of the Ring.",
        "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
      }
    ];
        invIndex.createIndex('dslkf', jsonData);
        invIndex.getIndex();
    }
});