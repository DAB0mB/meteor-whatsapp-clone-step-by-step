angular
  .module('Whatsapp')
  .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl($scope, $reactive, $state) {
  $reactive(this).attach($scope);

  $scope.logout = logout;

  ////////////

  function logout() {
    Meteor.logout((err) => {
      if (! err) {
        $state.go('login');
      }
    });
  }
}