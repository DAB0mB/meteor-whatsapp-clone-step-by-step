angular
  .module('Whatsapp')
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html',
      resolve: {
        user: ['$meteor', function ($meteor) {
          return $meteor.requireUser();
        }],
        chats: ['$meteor', function ($meteor) {
          return $meteor.subscribe('chats');
        }]
      }
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'client/templates/chats.html',
          controller: 'ChatsCtrl as chats',
        }
      }
    })
    .state('tab.chat', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'client/templates/chat.html',
          controller: 'ChatCtrl as chat',
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'client/templates/login.html',
      controller: 'LoginCtrl as user',
    })
    .state('confirmation', {
      url: '/confirmation/:phone',
      templateUrl: 'client/templates/confirmation.html',
      controller: 'ConfirmationCtrl as confirimation',
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'client/templates/profile.html',
      controller: 'ProfileCtrl as profile',
      resolve: {
        user: ['$meteor', function ($meteor) {
          return $meteor.requireUser();
        }]
      }
    })
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'client/templates/settings.html',
          controller: 'SettingsCtrl as settings',
        }
      }
    });

  $urlRouterProvider.otherwise('tab/chats');
}