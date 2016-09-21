angular.module('starter.controllers', [])
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

  $scope.irAInfo = function(){
    $state.go('tab.autor');
  }

})

.controller('PianoCtrl', function($scope, $state) {


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
  
  $scope.emitirSonido = function(item){
    console.log(item.sonido);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AutorCtrl', function($scope, $state) {
  
  $scope.goBack = function(){
    $state.go('tab.inicio');
  }
});
