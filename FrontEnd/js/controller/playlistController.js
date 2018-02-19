app.controller("playlistController", playlistController);

playlistController.$inject = ['$scope', "playlistService", '$window', '$route'];

function playlistController($scope, playlistService, $window, $route) {

  var usuario = JSON.parse($window.localStorage.getItem('usuario'));

  $scope.nomeUsuario = usuario.username;

  $scope.playlist = {}
  $scope.playlists = [];
  $scope.musicas = [];

  $scope.criarPlaylist = function (playlist) {
    console.log(playlist);

    if (usuario.username != null) {
      if (playlist.nome) {
        usuarioNovo = { nome: usuario.username, senha: usuario.senha };
        playlist.usuario = usuarioNovo;
        console.log("sou a playlist antes de adicionar", playlist);

        playlistService.postPlaylist(playlist);
      }
    }
    carregarPlaylist();
    $route.reload();
  }

  $scope.carregarMusicasPlaylist = function (nome) {
    getMusicasPlaylist(nome);
  }

  var getMusicasPlaylist = function (nome) {
    playlistService.getMusicasPlaylist(nome).then(function (data) {
      $scope.musicas = data;
      console.log("Musicas Carregadas!!!")
    }).catch(function onRejected(errorResponse) {
      console.log('Erro em playlistService');
      console.log('status: ', errorResponse.status);
    });

  }

  $scope.adicionarMusicaPlaylist = function (playlist, nome) {
    console.log(playlist.usuario);

    if (playlist.usuario.nome != $scope.nomeUsuario) {
      window.alert('Você não tem permissões para adicionar músicas');
    } else {
      if (nome) {
        console.log(nome);

        playlist.musicaADD = nome;
        console.log(playlist.musicaADD);
        playlistService.atualizarPlaylist(playlist);
      }
    }
  }

  $scope.excluirPlaylist = function (playlist) {
    if (playlist.usuario.nome != $scope.nomeUsuario) {
      window.alert('Você não tem permissões para excluir essa playlist');
    } else {
      playlistService.excluirPlaylist(playlist.nome);
      carregarPlaylist();
      location.reload();
    }
  }

var carregarPlaylist = function () {

  playlistService.get().then(function (data) {
    $scope.playlists = data;
    console.log($scope.playlists);

    console.log("Playlists Carregadas!!!")
  }).catch(function onRejected(errorResponse) {
    console.log('Erro em playlistService');
    console.log('status: ', errorResponse.status);
  });
}

carregarPlaylist();
}
