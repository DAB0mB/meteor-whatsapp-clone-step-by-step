angular
  .module('Whatsapp')
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html'
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'client/templates/chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'client/templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'client/templates/login.html',
      controller: 'LoginCtrl'
    })
    .state('confirmation', {
      url: '/confirmation/:phone',
      templateUrl: 'client/templates/confirmation.html',
      controller: 'ConfirmationCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'client/templates/profile.html',
      controller: 'ProfileCtrl'
    });

  $urlRouterProvider.otherwise('tab/chats');
}