angular.module('timelineApp', []);
angular.module('timelineApp').controller('timelineController', ['$scope', function ($scope) {
  $scope.timelinelist = [];
  $scope.timelineperiods = 10;
  $scope.timelinetime = 0;

  var init = function(lengthOfPeriodInSeconds){
    var initialtime = 0;
    for (var i = 0; i < $scope.timelineperiods; i++) {
      var timelineitem = {
        initialtime: initialtime,
        length: lengthOfPeriodInSeconds,
        endtime: initialtime + lengthOfPeriodInSeconds,
        teamAevents: [
          {
            timeinseconds: initialtime,
            title: 'test'
          }
        ]
      };

      initialtime += lengthOfPeriodInSeconds;
      $scope.timelinelist.push(timelineitem);
    }
    $scope.timelineperiods = initialtime;
  };

  $scope.addAction = function (timeinseconds, team) {

    for (var i = 0; i < $scope.timelineperiods; i++) {
      if($scope.timelinelist[i].initialtime < timeinseconds && $scope.timelinelist[i].endtime > timeinseconds ){

        var item = document.getElementById(i.toString());
        var timeinperiod = timeinseconds - $scope.timelinelist[i].initialtime;
        var eventleft = parseInt(item.offsetWidth) * parseInt(timeinperiod);
        eventleft = eventleft/parseInt($scope.timelinelist[i].length);

        var div = document.createElement('div');
        if(team === 1){
          div.className = 'timeline-event-teamA';
        }else if (team === 2) {
          div.className = 'timeline-event-teamB';
        }
        
        div.style.left = eventleft.toString() + 'px';

        item.appendChild(div);
        break;
      }
    }
  };

  init(1800);
}]);
