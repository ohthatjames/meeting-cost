function MeetingCtrl($scope) {
  $scope.numberOfPeople = 4;
  $scope.costPerPersonPerSecond = 1000 / 3600 // £10 p/h
  $scope.startTime = null;
  $scope.totalCost = 0;
  $scope.elapsedTime = 0;
  $scope.started = false;

  $scope.startMeeting = function() {
    $scope.startTime = Date.now();
    $scope.started = true;
    setInterval($scope.tick, 1000);
  }

  $scope.tick = function() {
    $scope.elapsedTime = (Date.now() - $scope.startTime) / 1000;
    $scope.totalCost = $scope.numberOfPeople * $scope.costPerPersonPerSecond * $scope.elapsedTime / 100;
    $scope.$apply();
  }
}
