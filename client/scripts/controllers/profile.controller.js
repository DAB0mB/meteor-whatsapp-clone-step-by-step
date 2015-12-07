angular
  .module('Whatsapp')
  .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl ($scope, $reactive, $state, $ionicPopup, $log, $ionicLoading) {
  $reactive(this).attach($scope);

  var user = Meteor.user();
  var name = user && user.profile ? user.profile.name : '';

  this.data = { name: name };
  this.updateName = updateName;
  this.updatePicture = updatePicture;

  ////////////

  function updatePicture () {
    MeteorCameraUI.getPicture({ width: 60, height: 60 }, function (err, data) {
      if (err && err.error == 'cancel') {
        return;
      }

      if (err) {
        return handleError(err);
      }

      $ionicLoading.show({
        template: 'Updating picture...'
      });

      Meteor.call('updatePicture', data, (err) => {
        $ionicLoading.hide();
        handleError(err);
      });
    });
  }

  function updateName () {
    if (_.isEmpty(this.data.name)) {
      return;
    }

    Meteor.call('updateName', this.data.name, (err) => {
      if (err) return handleError(err);
      $state.go('tab.chats');
    });
  }

  function handleError (err) {
    $log.error('profile save error ', err);

    $ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}