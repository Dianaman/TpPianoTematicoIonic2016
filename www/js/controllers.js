angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $rootScope){
  $scope.username = '';
  $scope.entrar = function(){
    $rootScope.usuario = $scope.username;
    console.log($scope.username);
    $state.go('tab.piano');
  }
})

.controller('DashCtrl', function($scope) {})

.controller('PianoCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AutorCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
