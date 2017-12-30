app.controller("playlistController", playlistController);

playlistController.$inject = ['$scope',"playlistService"];

function playlistController($scope,playlistService){

  $scope.playlist = {}
  $scope.playlists = [];
  $scope.musicas = [];

  $scope.criarPlaylist = function(playlist){
    console.log("oi");
    playlistService.postPlaylist(playlist);
    carregarPlaylist();
  }

  var carregarPlaylist = function(){

    playlistService.get().then(function (data){
      $scope.playlists = data;
      console.log("Carregados!!!")
      console.log(data);
    }).catch( function onRejected(errorResponse){
      console.log('Erro em playlistService');
      console.log('status: ', errorResponse.status);
    });
  }

  carregarPlaylist();
}
