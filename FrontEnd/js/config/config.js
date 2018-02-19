app.config(function($routeProvider) {
    $routeProvider
      .when('/playlist',{
        templateUrl: '/templates/tela-playlists.html',
        controller: 'playlistController'
      })
      .when('/artistas', {
        templateUrl: '/templates/tela-artistas.html',
        controller: 'artistaController'
      })
      .when('/login', {
        templateUrl: '/templates/login-cadastro.html',
        controller: 'UserController'
      })
      .when('/musicas', {
        templateUrl: '/templates/tela-musicas.html',
        controller: 'amController'
      })
      .when('/musiteca',{
        templateUrl: '/templates/tela-musiteca.html',
        controller: 'artistaController'
      }
      )
      .otherwise({
        redirectTo: '/musiteca'
      });
});
