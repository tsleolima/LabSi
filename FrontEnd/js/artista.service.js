app.service('artistaService', artistaService);

function artistaService($http) {

  this.get = function(){
    return(
      $http.get("http://localhost:8080/artista")
      .then(function(response){
        return response.data;
      })
    )

    }

    this.getAlbunsArtista = function(artista){
      return(
        $http.get("http://localhost:8080/album/artista",artista)
        .then(function(response){
          return response.data;
        })
      )

      }

    this.post = function(artista) {
      $http.post("http://localhost:8080/artista",artista).success(function(data){
        return artista;
      });
    }

    this.atualizarNota = function(artista){

      var uri = "http://localhost:8080/artista"
      var action = $http({
          method: 'PUT',
          url: uri,
          headers: {"Content-Type": "application/json;charset=UTF-8"},
          data: artista
      });
      return action;
    }

    this.delete = function(){
      $http.delete("http://localhost:8080/artista").success(function(data){
        console.log("Todos deletados!!!")
      })
    }

    this.getArtista = function(nomeArtista) {
      return(
        $http.get("http://localhost:8080/artista"+nomeArtista+'/')
        .then(function(response){
          console.log(response)
          return response.data;
        })
      )
    }

  }
