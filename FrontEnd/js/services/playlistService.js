app.service('playlistService', playlistService);

function playlistService($http) {

  this.get = function () {
    return (
      $http.get("http://localhost:8080/playlist")
        .then(function (response) {
          return response.data;
        })
    )
  }

  this.postPlaylist = function (playlist) {
    console.log(playlist);
    $http.post("http://localhost:8080/playlist", playlist).then(function (data) {
      return playlist;
    }).catch(function (response) {
      console.error('Playlist já adicionada ao sistema', response.status, response.data);
      window.alert("Playlist já adicionada!");
      return response.status;
    });
  }

  this.postPlaylistMusica = function (musica, nomePlaylist) {
    $http.post("http://localhost:8080/playlist", musica, nomePlaylist).then(function (data) {
    }).catch(function (response) {
      console.error('Musica já adicionado a playlist', response.status, response.data);
      window.alert("Musica já adicionada a playlist!");
      return response.status;
    });
  }

  this.getMusicasPlaylist = function (nome) {
    return (
      $http.get("http://localhost:8080/playlist/musicas/" + nome + '/', {
        params: { nome: nome }
      })
        .then(function (response) {
          console.log("Oi sou o response das musicas da playlists", response.data);
          return response.data;
        })
        .catch(function (response) {
          console.error('Falha ao excluir playlist', response.status, response.data);
        })
    );
  }

  this.deleteAll = function () {
    $http.delete("http://localhost:8080/playlist").then(function (data) {
      console.log("Todos deletados!!!")
    })
  }

  this.atualizarPlaylist = function (playlist) {    
    var uri = "http://localhost:8080/playlist/musica"
    var action = $http({
      method: 'PUT',
      url: uri,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      data: playlist
    });
    return action;
  }

  this.excluirPlaylist = function (nome) {
    $http.delete("http://localhost:8080/playlist/" + nome + '/', {
      params: { nome: nome }
    })
      .then(function (response) {
        console.log("Oi sou o response das playlists", response.data);
        return response.data;
      })
      .catch(function (response) {
        console.error('Falha ao excluir playlist', response.status, response.data);
      });
  }

}
