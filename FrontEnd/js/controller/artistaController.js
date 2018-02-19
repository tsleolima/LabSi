app.controller("artistaController", artistaController);

artistaController.$inject = ['$scope', "artistaService", '$location'];

function artistaController($scope, artistaService, $location) {

	$scope.artistas = [];
	$scope.artistasFavoritos = [];

	$scope.notas = [1, 2, 3, 4, 5];

	$scope.albuns = [];
	$scope.musicas = [];

	var carregarArtistas = function () {

		artistaService.get().then(function (data) {
			$scope.artistas = data;
			console.log("Artistas Carregados!!!")
		}).catch(function onRejected(errorResponse) {
			console.log('Erro em artistaService');
			console.log('status: ', errorResponse.status);
		});
	}

	$scope.adicionarArtista = function (artista) {
		artistaService.post(artista);
		$scope.artista = {};
		$location.path('/musiteca');
		carregarArtistas();
	}

	$scope.carregaMusicaAlbumArtista = function (nomeArtista) {
		getAlbumArtista(nomeArtista);
		getMusicasArtista(nomeArtista);
	}

	var getAlbumArtista = function (nomeArtista) {

		artistaService.getAlbunsArtista(nomeArtista).then(function (data) {
			$scope.albuns = data;
			console.log("Albuns Carregados!!!")
		}).catch(function onRejected(errorResponse) {
			console.log('Erro em artistaService');
			console.log('status: ', errorResponse.status);
		});

	}

	var getMusicasArtista = function (nomeArtista) {

		artistaService.getMusicasArtista(nomeArtista).then(function (data) {
			$scope.musicas = data;
			console.log("Musicas Carregadas!!!")
		}).catch(function onRejected(errorResponse) {
			console.log('Erro em artistaService');
			console.log('status: ', errorResponse.status);
		});

	}

	$scope.pesquisarArtistas = function (nomeArtistaPesquisado) {
		$scope.artistaPesquisado = nomeArtistaPesquisado;
	}

	$scope.removerTodosArtistas = function () {
		artistaService.delete();
		carregarArtistas();
	}

	$scope.atualizarArtista = function (artista) {
		console.log(artista);
		artistaService.atualizarArtista(artista);
	}

	searchArtista = function (nomeArtista) {
		var retorno = null;
		angular.forEach($scope.artistas, function (artista, i) {
			if (artista.nomeArtista === nomeArtista) {
				retorno = artista;
			}
		});
		return retorno;
	}

	$scope.adicionarFavoritos = function (artista) {
		if (artista.favorito) {
			artista.favorito = false;
			window.alert(artista.nomeArtista + " foi removido dos favoritos!!");
		} else {
			artista.favorito = true;
			window.alert(artista.nomeArtista + " foi adicionado aos favoritos!!");
		}
		$scope.atualizarArtista(artista);
	}

	carregarArtistas();
}
