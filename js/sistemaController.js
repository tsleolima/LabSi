app.controller("sistemaController", function($scope){

	$scope.artistas = [];
	musicas = [];
	$scope.artistasFavoritos = [];
	$scope.playlists = [];

	$scope.novoArtista = {};
	$scope.novaMusica = {};

	$scope.adicionarArtista = function(){
        if (searchArtista($scope.novoArtista.nomeArtista) == null){

			$scope.novoArtista.albuns = [];
			$scope.artistas.push($scope.novoArtista);

			$scope.novoArtista = {};

        } else {
            $scope.errorTextArtista = "O artista já foi adicionado no sistema.";
        }
	}

	$scope.pesquisarArtistas = function(nomeArtistaPesquisado){
		$scope.artistaPesquisado = nomeArtistaPesquisado;
	}

	$scope.removerArtista = function(nomeArtista){
		angular.forEach($scope.artistas, function(artista,i){
			if(artista.nomeArtista == nomeArtista){
				$scope.artistas.splice(i,1);
			}
		});
	}

	searchArtista = function(nomeArtista){
		var retorno = null;
		angular.forEach($scope.artistas, function(artista, i){
			if(artista.nomeArtista === nomeArtista){
				retorno = artista;
			}
		});
		return retorno;
	}

	$scope.adicionarArtistaFavoritos = function(artista){
		$scope.artistasFavoritos.push(artista);
	}

	$scope.removerArtistaFavoritos = function(id){
		angular.forEach($scope.artistasFavoritos, function(artistaFavoritos, i){
			if(artistaFavoritos.id === id){
				$scope.artistasFavoritos.splice(i,1);
			}
		});
	}

	$scope.adicionarMusica = function(){
	    var album = verificaAlbumSistema($scope.novaMusica.nomeAlbum, $scope.novaMusica.nomeArtistaMusica);
	  	if (album == null){

	    var album = [];
	    var artista = searchArtista($scope.novaMusica.nomeArtistaMusica);

	    album.push($scope.novaMusica);
	  	album.nomeAlbum = $scope.novaMusica.nomeAlbum;

	    artista.albuns.push(album);
	  	musicas.push($scope.novaMusica);
	    $scope.novaMusica = {};

  	} else {
      if(verificaMusicaAlbum($scope.novaMusica,album) == null){
      	album.push($scope.novaMusica);
      	musicas.push($scope.novaMusica);
    		$scope.novaMusica = {};
     }else{
      	$scope.errorTextMusica = "Música já existente no álbum";
      }
    }
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

	verificaAlbumSistema = function(nomeAlbum, nomeArtista){
		var artistaPesquisado = searchArtista(nomeArtista);
		var retorno = null;
		angular.forEach(artistaPesquisado.albuns, function(album, i){
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

});
