angular
  .module('Whatsapp')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
  $reactive(this).attach($scope);

  $scope.data = {};
  $scope.login = login;

  ////////////

  function login() {
    if (_.isEmpty($scope.data.phone)) {
      return;
    }

    var confirmPopup = $ionicPopup.confirm({
      title: 'Number confirmation',
      template: '<div>' + $scope.data.phone + '</div><div>Is your phone number above correct?</div>',
      cssClass: 'text-center',
      okText: 'Yes',
      okType: 'button-positive button-clear',
      cancelText: 'edit',
      cancelType: 'button-dark button-clear'
    });

    confirmPopup.then((res) => {
      if (! res) return;

      $ionicLoading.show({
        template: 'Sending verification code...'
      });

      Accounts.requestPhoneVerification($scope.data.phone, (err) => {
        $ionicLoading.hide();

        if (err) {
          return handleError(err);
        }

        $state.go('confirmation', {phone: $scope.data.phone});
      });
    });
  }

  function handleError(err) {
    $log.error('Login error ', err);

    $ionicPopup.alert({
      title: err.reason || 'Login failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}