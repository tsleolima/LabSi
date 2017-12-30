app.config(function($routeProvider) {
    $routeProvider
      .when('/playlist',{
        templateUrl: 'playlist.html',
        controller: 'playlistController'
      })
      .when('/artistas', {
        templateUrl: 'artista.html',
        controller: 'artistaController'
      })
      .when('/cadastro', {
        templateUrl: 'cadastro.html',
        controller: 'UserController'
      })
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'loginController'
      })
      .when('/am', {
        templateUrl: 'am.html',
        controller: 'amController'
      }).otherwise({
        redirectTo: '/'
      });
});
