angular
  .module('Whatsapp')
  .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
  $reactive(this).attach($scope);

  this.data = {};
  this.login = login;

  ////////////

  function login() {
    if (_.isEmpty(this.data.phone)) {
      return;
    }

    var confirmPopup = $ionicPopup.confirm({
      title: 'Number confirmation',
      template: '<div>' + this.data.phone + '</div><div>Is your phone number above correct?</div>',
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

      Accounts.requestPhoneVerification(this.data.phone, (err) => {
        $ionicLoading.hide();

        if (err) {
          return handleError(err);
        }

        $state.go('confirmation', {phone: this.data.phone});
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