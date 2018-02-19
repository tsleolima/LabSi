app.service('artistaService', artistaService);

function artistaService($http) {

  this.get = function () {
    return (
      $http.get("http://localhost:8080/artista")
        .then(function (response) {
          return response.data;
        })
    )

  }

  this.getAlbunsArtista = function (nomeArtista) {
    return (
      $http.get("http://localhost:8080/album/artista", {
        params: { nomeArtista: nomeArtista }
      })
        .then(function (response) {
          console.log("OI eu sou o response dos albuns" , response.data);
          
          return response.data;
        })
        .catch(function (response) {
          console.error('Album do artista não carregado');
        })
    )

  }

  this.getMusicasArtista = function (nomeArtista) {
    return (
      $http.get("http://localhost:8080/musica/artista", {
        params: { nomeArtista: nomeArtista}
      })
      .then(function (response){
        console.log("Oi sou o response das musicas", response.data);
        return response.data;
      })
    )
    .catch(function (response){
      console.error("Musica do artista não carregada");
    })
  }

  this.post = function (artista) {
    $http.post("http://localhost:8080/artista", artista).success(function (data) {
      return artista;
    }).catch(function (response) {
      console.error('Artista já adicionado ao sistema', response.status, response.data);
      window.alert("Artista já adicionado!");
      return response.status;
    });
  }

  this.atualizarArtista = function (artista) {    
    var uri = "http://localhost:8080/artista"
    var action = $http({
      method: 'PUT',
      url: uri,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      data: artista
    });
    return action;
  }

  this.delete = function () {
    $http.delete("http://localhost:8080/artista").success(function (data) {
      console.log("Todos deletados!!!")
    })
  }

  this.getArtista = function (nomeArtista) {
    return (
      $http.get("http://localhost:8080/artista" + nomeArtista + '/')
        .then(function (response) {
          console.log(response)
          return response.data;
        })
    )
  }

}
