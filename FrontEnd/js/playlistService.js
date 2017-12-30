app.service('playlistService', playlistService);

function playlistService($http) {

  this.get = function(){
    return(
      $http.get("http://localhost:8080/playlist")
      .then(function(response){
        return response.data;
      })
    )

    }

    this.postPlaylist = function(playlist) {
      $http.post("http://localhost:8080/playlist",playlist).success(function(data){
      });
    }

    this.postPlaylistMusica = function(musica, nomePlaylist) {
      $http.post("http://localhost:8080/playlist",musica,nomePlaylist).success(function(data){
      });
    }

    this.deleteAll = function(){
      $http.delete("http://localhost:8080/playlist").success(function(data){
        console.log("Todos deletados!!!")
      })
    }

    this.delete = function(nome){
      $http.delete("http://localhost:8080/playlist"+nome+"/", nome ).success(function(data){
      })
    }

  }
