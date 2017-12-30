app.service('musicaService', musicaService);

function musicaService($http){

  this.post = function(musica) {
    $http.post("http://localhost:8080/musica",musica).success(function(data){
      return musica;
    });
  }

}
