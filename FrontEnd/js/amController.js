app.controller("amController", amController);

amController.$inject = ['$scope',"musicaService"];

function amController($scope,musicaService){

  $scope.playlists = [];

  $scope.adicionarMusica = function(musica){
    musicaService.post(musica);
    $scope.musica = {};
  }

  verificaMusicaAlbum = function(musica,album){
    var retorno = null;
    angular.forEach(album, function(m, i){
      if (m.nomeMusica === musica.nomeMusica) {
        retorno = m;
      }
    });
    return retorno;
  }

  $scope.removerMusica = function(id){
    angular.forEach($scope.musicas, function(musica,i){
      if(musica.id == id){
        $scope.musicas.splice(i,1);
      }
    });
  }

  searchMusica = function(nomeMusica){
    var retorno = null;
    angular.forEach(musicas, function(musica, i){
      if(musica.nomeMusica === nomeMusica){
        retorno = musica;
      }
    });
    return retorno;
  }

  verificaAlbum = function(nomeAlbum){
    var retorno = null;
    angular.forEach(artista.albuns, function(album, i){
      if(album.nomeAlbum === nomeAlbum){
        retorno = album;
      }
    });
    return retorno;
  }

  $scope.criarPlaylist = function(nomePlaylist){
    if (searchPlaylist(nomePlaylist) == null){

      var playlist = {};
      playlist.nomePlaylist = $scope.nomePlaylist;
      playlist.musicas = [];
      $scope.playlists.push(playlist);

    } else {
      $scope.errorTextPlaylist = "A playlist já foi adicionada no sistema.";
    }
  }

  searchPlaylist = function(nomePlaylist){
    var retorno = null;
    angular.forEach($scope.playlists, function(playlist,i){
      if(playlist.nomePlaylist === nomePlaylist){
        retorno = playlist;
      }
    });
    return retorno;
  }

  $scope.adicionarMusicaPlaylist = function(playlist,nomeMusica){
    if (verificaMusicaPlaylist(playlist,nomeMusica) ==  null){
      var musica = searchMusica(nomeMusica);
      if(musica != null){
        playlist.musicas.push(musica);}
      }else {
        $scope.errorTextPlaylistMusica = "A música já foi adicionada na playlist.";
      }
    }

    verificaMusicaPlaylist = function(playlist,nomeMusica){
      var retorno = null;
      angular.forEach(playlist.musicas, function(musica,i){
        if(musica.nomeMusica === nomeMusica){
          retorno = musica;
        }
      });

      return retorno;
    }

    $scope.removerMusicaPlaylist = function(playlist, nomeMusica){
      angular.forEach(playlist.musicas, function(musica,i){
        if(musica.nomeMusica === nomeMusica){
          playlist.musicas.splice(i,1);
        }
      });
    }

    $scope.removerPlaylist = function(nomePlaylist){
      angular.forEach($scope.playlists, function(playlist,i){
        if(playlist.nomePlaylist === nomePlaylist){
          $scope.playlists.splice(i,1);
        }
      });
    }

  }
