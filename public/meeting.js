function MeetingCtrl($scope) {
  $scope.numberOfPeople = 4;
  $scope.costPerHour = 20;
  $scope.meetingLengthInMinutes = 30;
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
    $('#progress-bar').progressbar({max: $scope.meetingLengthInSeconds(), value: 0})
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
    $scope.totalCost = checkpointTotal + $scope.costForTime(checkpointElapsedTime);
    updateProgressBar();
    $scope.$apply();
  }

  $scope.costForTime = function(timeInSeconds) {
    var costPerPersonPerSecond = $scope.costPerHour / 3600
    return $scope.numberOfPeople * costPerPersonPerSecond * timeInSeconds;
  }

  $scope.meetingLengthInSeconds = function() {
    return $scope.meetingLengthInMinutes * 60;
  }

  $scope.meetingHasExceededLength = function() {
    return $scope.elapsedTime > $scope.meetingLengthInSeconds();
  }

  $scope.meetingOverrunBySeconds = function() {
    if($scope.meetingHasExceededLength()) {
      console.log($scope.elapsedTime - $scope.meetingLengthInSeconds())
      return $scope.elapsedTime - $scope.meetingLengthInSeconds();
    }
    else {
      return 0;
    }
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

  var updateProgressBar = function() {
    $('#progress-bar').progressbar({value: $scope.elapsedTime})
    var percentageComplete = $scope.elapsedTime / ($scope.meetingLengthInSeconds())
    if(percentageComplete > 0.9) {
      $('#progress-bar').removeClass('amber')
      $('#progress-bar').addClass('red')
    }
    else if(percentageComplete > 0.5) {
      $('#progress-bar').addClass('amber')
    }
  }

}
