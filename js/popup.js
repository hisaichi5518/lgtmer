var lgtmer = angular.module("Lgtmer", []);
lgtmer.controller("SearchHistoryController", ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
  $scope.searchBy = function(word) {
      $http.get("http://tumbapi.herokuapp.com/search/photo", {"params": {"q": word}}).success(function(data) {
          $scope.lgtms = data.urls.map(function (lgtm){
            return lgtm;
          });
      });
  };

  $scope.copyToClipBoard = function(lgtm) {
    // http://www.pakzilla.com/2012/03/20/how-to-copy-to-clipboard-in-chrome-extension/
    var copyDiv = document.createElement('div');
    copyDiv.contentEditable = true;
    document.body.appendChild(copyDiv);

    copyDiv.innerHTML = "![LGTM](http://hisaichilgtm.herokuapp.com/" + lgtm + ")";
    copyDiv.unselectable = "off";
    copyDiv.focus();

    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(copyDiv);

    $scope.copied = true;
    $timeout(function() { $scope.copied = false }, 2000);
  };
}]);
