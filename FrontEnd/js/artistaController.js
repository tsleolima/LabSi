app.controller("artistaController", artistaController);

artistaController.$inject = ['$scope',"artistaService"];

function artistaController($scope,artistaService){

	$scope.artistas = [];
	$scope.artistasFavoritos = [];

	$scope.notas = [1,2,3,4,5];

	$scope.albuns = [];

	var carregarArtistas = function(){

		artistaService.get().then(function (data){
			$scope.artistas = data;
			console.log("Carregados!!!")
		}).catch( function onRejected(errorResponse){
			console.log('Erro em artistaService');
			console.log('status: ', errorResponse.status);
		});
	}

	var carregarAlbunsArtistas = function(artista){

		artistaService.getAlbunsArtista(artista).then(function (data){
			$scope.albuns = data;
			console.log("Carregados!!!")
		}).catch( function onRejected(errorResponse){
			console.log('Erro em artistaService');
			console.log('status: ', errorResponse.status);
		});
	}

	$scope.adicionarArtista = function(artista){

		if (searchArtista(artista.nomeArtista) == null){

			artista.albuns = [];
			artistaService.post(artista);
			$scope.artista = {};
			carregarArtistas();
			carregarAlbunsArtistas();

		} else {
			alert("Artista Já adicionado ao sistema");
		}
	}

	$scope.pesquisarArtistas = function(nomeArtistaPesquisado){
		$scope.artistaPesquisado = nomeArtistaPesquisado;
	}

	$scope.removerTodosArtistas = function(){
		artistaService.delete();
		carregarArtistas();
	}

	$scope.adicionarNotaArtista = function(artista){
		artistaService.atualizarNota(artista);
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

	$scope.removerArtistaFavoritos = function(nome){
		angular.forEach($scope.artistasFavoritos, function(aFavoritos, i){
			if(aFavoritos.nomeArtista === nome){
				$scope.artistasFavoritos.splice(i,1);
			}
		});
	}
	carregarArtistas();
	carregarAlbunsArtistas();
}
