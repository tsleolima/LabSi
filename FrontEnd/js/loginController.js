app.controller("loginController", loginController);

loginController.$inject = ['$scope',"$http","$window"];

function loginController($scope,$http,$window){

  $scope.login =  function(usuario){

    $http.post("http://localhost:8080/login",usuario).then(function(result){
      $window.localStorage.setItem("token",result.data);
    }).catch( function onRejected(errorResponse){
      console.log('Erro em loginController');
      console.log('status: ', errorResponse);
    });

  }

  $scope.logout = function(){
    $window.localStorage.removeItem("token");
    $scope.usuario = {};
  }
}
