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

.controller('PianoCtrl', function($scope, $state, $ionicPlatform, $cordovaFile, $cordovaNativeAudio) {


  $scope.items = [{
    image: 'img/pteri/blue.PNG',
    sonido: 'azul',
    musica: 'sounds/azul.m4a'
  },{
    image: 'img/pteri/white.PNG',
    sonido: 'blanco',
    musica: 'sounds/blanco.m4a'
  },{
    image: 'img/pteri/pink.PNG',
    sonido: 'rosa',
    musica: 'sounds/rosa.m4a'
  },{
    image: 'img/pteri/orange.PNG',
    sonido: 'naranja',
    musica: 'sounds/naranja.m4a'
  },{
    image: 'img/pteri/purple.PNG',
    sonido: 'violeta',
    musica: 'sounds/violeta.m4a'
  },{
    image: 'img/pteri/green.PNG',
    sonido: 'verde',
    musica: 'sounds/verde.m4a'
  }];

  $scope.goBack = function(){
    $state.go('tab.inicio');
  }
  
$scope.melodia = '';
try{
      $ionicPlatform.ready(function() {

      $cordovaNativeAudio
      .preloadSimple('azul', 'sounds/azul.m4a')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        alert(error);
      });

      $cordovaNativeAudio
      .preloadSimple('verde', 'sounds/verde.m4a')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        alert(error);
      });

      $cordovaNativeAudio
      .preloadSimple('rosa', 'sounds/rosa.m4a')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        alert(error);
      });

      $cordovaNativeAudio
      .preloadSimple('blanco', 'sounds/blanco.m4a')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        alert(error);
      });

      $cordovaNativeAudio
      .preloadSimple('naranja', 'sounds/naranja.m4a')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        alert(error);
      });

      $cordovaNativeAudio
      .preloadSimple('violeta', 'sounds/violeta.m4a')
      .then(function (msg) {
        console.log(msg);
      }, function (error) {
        alert(error);
      });

      })
      $scope.emitirSonido = function(item){
        
        
        //console.log(item.sonido);
        $scope.melodia = $scope.melodia.concat(item.sonido + ' ');
        $cordovaNativeAudio.play(item.sonido);
        //console.log($scope.melodia);
      }
  }catch(e){
    console.log(e.message);
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
