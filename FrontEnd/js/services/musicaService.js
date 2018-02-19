app.service('musicaService', musicaService);

function musicaService($http){

  this.post = function(musica) {
    $http.post("http://localhost:8080/musica",musica).success(function(data){
      return musica;
    }).catch(function (response) {
      console.error('Musica já adicionado ao sistema', response.status, response.data); 
      window.alert("Musica já adicionado!");           
      return response.status;
    });
  }

}
