app.controller("btnctrl", ($scope, $http) => {
    $scope.query = "";
    $scope.result = "";
    $scope.borderStyle = "default-border";
    $scope.badgeState = "";
    $scope.badgeText = "Attempt"
    
    $scope.build = (input) => {
        var addToQuery = () => {$scope.query = $scope.query + ' ' + input;}
        var removeFromQuery = () => {
            $scope.query = $scope.query.trim();
            $scope.query = $scope.query.replace(input,'')
        }
        var index = input == "*" ? index = $scope.query.search("\\" + input) :  index = $scope.query.search(input);
        index == -1 ? addToQuery() : removeFromQuery();
    }

    $scope.validate = (ValidString) => {
        $scope.query = $scope.query.trim();
        ValidString = ValidString.trim();
        //alert($scope.query + ' ' + ValidString)
        if ($scope.query == ValidString) {
            $scope.borderStyle = "success-border";
            $scope.badgeText = "Success!";
            $scope.badgeState = "badge-success";
            $scope.execute($scope.query);
        } else {
            $scope.badgeState = "badge-danger";
            $scope.badgeText = "Failed - Try Again";
            $scope.borderStyle = "fail-border";
            $scope.query = "";
        }
    }

    $scope.execute = (query) => {
        var finished = false;
        if (query == "SELECT Age, Student_ID, Grade FROM Students WHERE FirstName = \"Josh\"") {
            finished = true;
        }
        $http.post("http://SqlIntApi-env.9zmwbqfsmz.us-east-2.elasticbeanstalk.com/search", {"command": query})
        //.then((res) => res.data.json())
        .then((res) => {$scope.result = res.data;})

        if (finished) {
            alert("You did it!!! Nice Job!")
        }
    }
  });