angular.module('starter.controllers', ['ngCordova'])
.run(function($rootScope){
  $rootScope.usuario = {};
  $rootScope.usuario.name = "";
})

.controller('LoginCtrl', function($scope, $state, $rootScope){
  $scope.datos = {};
  $scope.entrar = function(datos){
    $rootScope.usuario.nombre = datos;
    console.log(datos);
    $state.go('tab.inicio');
  }
})

.controller('InicioCtrl', function($scope, $state) {
  $scope.irAPiano = function(){
    $state.go('tab.piano');
  }

  $scope.irAArchivo = function(){
    $state.go('tab.archivo');
  }

  $scope.irAInfo = function(){
    $state.go('tab.autor');
  }

})

.controller('PianoCtrl', function($scope, $state, $ionicPlatform, $cordovaFile) {


  $scope.items = [{
    image: 'img/pteri/blue.PNG',
    sonido: 'azul'
  },{
    image: 'img/pteri/white.PNG',
    sonido: 'blanco'
  },{
    image: 'img/pteri/pink.PNG',
    sonido: 'rosa'
  },{
    image: 'img/pteri/orange.PNG',
    sonido: 'naranja'
  },{
    image: 'img/pteri/purple.PNG',
    sonido: 'violeta'
  },{
    image: 'img/pteri/green.PNG',
    sonido: 'verde'
  }];

  $scope.goBack = function(){
    $state.go('tab.inicio');
  }
  
$scope.melodia = '';

  $scope.emitirSonido = function(item){
    //console.log(item.sonido);
    $scope.melodia = $scope.melodia.concat(item.sonido + ' ');
    //console.log($scope.melodia);
  }

  $scope.guardarMelodia = function(){
    try{
        $ionicPlatform.ready(function() {
          $cordovaFile.createFile(cordova.file.dataDirectory, "piano.txt", true) 
          .then(function (success) {
              $cordovaFile.writeFile(cordova.file.dataDirectory, "piano.txt", $scope.melodia, true)
              .then(function (success) {
                console.log("Se escribió correctamente");
                $cordovaFile.readAsText(cordova.file.dataDirectory, "piano.txt")
                  .then(function (success) {
                    alert('Se escribió correctamente: ' + success);
                  }, function (error) {
                    alert("Error al leer");
                  });
              }, function (error) {
                alert("Error al escribir");
              });
          }, function (error) {
              alert("Error al crear el archivo");
          });

                /*$cordovaFile.readAsText(cordova.file.dataDirectory, "piano.txt")
                  .then(function (success) {
                    alert(success);
                    $scope.archivo = success;
                  }, function (error) {
                    alert("Error al leer");
                  });*/

          
        });



    }catch(e){
      alert('Error en el try' + e.message);
    }
  }
})

.controller('ArchivoCtrl', function($scope, $state, $ionicPlatform, $cordovaFile) {
  $scope.archivo = {};

  try{
    $ionicPlatform.ready(function() {

      $cordovaFile.checkFile(cordova.file.dataDirectory, "piano.txt")
        .then(function (success) {
            $cordovaFile.readAsText(cordova.file.dataDirectory, "piano.txt")
            .then(function (success) {
              $scope.archivo.melodia = success;
            }, function (error) {
              $scope.archivo.error = "Error al leer";
            });
        }, function (error) {
          $scope.archivo.error = 'No hay ninguna melodía guardada';
        });


    });
  }
  catch(ex){
    $scope.archivo.error = ex.message;
  }

  $scope.goBack = function(){
    $state.go('tab.inicio');
  }

})

.controller('AutorCtrl', function($scope, $state) {
  
  $scope.goBack = function(){
    $state.go('tab.inicio');
  }
});
