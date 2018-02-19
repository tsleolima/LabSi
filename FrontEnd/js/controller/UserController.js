'use strict';

app.controller('UserController', ['$scope', '$http', '$location','$window', function ($scope, $http, $location,$window) {

  $scope.usuarioCadastravel = { nome: '', senha: '', email: '' };

  $scope.cadastrarUsuario = function (usuario) {
    $http.post('http://localhost:8080/usuarios', usuario).then(function (result) {
      window.alert("Cadastrado com sucesso!!! :)");
    }).catch(function onRejected(errorResponse) {
      window.alert("Usuario já cadastrado!!! :(");
      console.log('Erro em userController');
      console.log('status: ', errorResponse);
    });
    $scope.usuarioCadastravel = {};
  }

  $scope.login = function (usuario) {
    $window.localStorage.setItem('usuario', JSON.stringify(usuario));
    $http.post("http://localhost:8080/login", usuario).then(function (result) {
      $window.localStorage.setItem("token", result.data);
      console.log("oi");
      
      $location.path("/sistema");
      window.alert("Logado com sucesso!!! :)");
    }).catch(function onRejected(errorResponse) {
      window.alert("Você tem problemas no login :|");
      console.log('Erro em loginController');
      console.log('status: ', errorResponse);
    });
  }

  $scope.logout = function () {
    $window.localStorage.removeItem("token");
    $scope.usuario = {};
    window.alert("Você deslogou :(");
  }

}]);
