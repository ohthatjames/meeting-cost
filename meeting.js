function MeetingCtrl($scope) {
  $scope.numberOfPeople = 4;
  $scope.costPerPersonPerSecond = 1000 / 3600 // £10 p/h
  $scope.startTime = null;
  $scope.totalCost = 0;
  $scope.elapsedTime = 0;
  $scope.started = false;

  // The checkpoint stores the time and total whenever anything changes, eg the number of people.
  // TODO: Can I store the checkpoint each time and only add the delta? Will that potentially "lose" seconds if the inteerval triggers in a different timeframe to clock time?
  var checkpointTotal = 0;
  var checkpointTime = null;

  $scope.startMeeting = function() {
    $scope.startTime = Date.now();
    $scope.started = true;
    setCheckpoint();
    setInterval($scope.tick, 1000);
  }

  $scope.incrementPeople = function() {
    changePeople($scope.numberOfPeople + 1)
  }

  $scope.decrementPeople = function() {
    changePeople($scope.numberOfPeople - 1)
  }

  $scope.tick = function() {
    var now = Date.now();
    $scope.elapsedTime = (now - $scope.startTime) / 1000;
    var checkpointElapsedTime = (Date.now() - checkpointTime) / 1000;
    $scope.totalCost = checkpointTotal + $scope.numberOfPeople * $scope.costPerPersonPerSecond * checkpointElapsedTime / 100;
    $scope.$apply();
  }

  var changePeople = function(newNumberOfPeople) {
    if(newNumberOfPeople < 1) {
      return;
    }
    $scope.numberOfPeople = newNumberOfPeople;
    setCheckpoint();
  }

  var setCheckpoint = function() {
    checkpointTime = Date.now();
    checkpointTotal = $scope.totalCost;
  }
}
