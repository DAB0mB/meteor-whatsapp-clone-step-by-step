angular
  .module('Whatsapp')
  .controller('ChatDetailCtrl', ChatDetailCtrl);

function ChatDetailCtrl ($scope, $reactive, $stateParams, $ionicScrollDelegate, $timeout, $ionicPopup, $log) {
  $reactive(this).attach($scope);

  var chatId = $stateParams.chatId;
  var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.data = {};
  $scope.sendMessage = sendMessage;
  $scope.inputUp = inputUp;
  $scope.inputDown = inputDown;
  $scope.closeKeyboard = closeKeyboard;
  $scope.sendPicture = sendPicture;

  $scope.helpers({
    messages() {
      return Messages.find({ chatId: chatId });
    },
    chat() {
      return Chats.findOne(chatId);
    },
  });

  $scope.$watchCollection('messages', (oldVal, newVal) => {
    var animate = oldVal.length !== newVal.length;
    $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
  });

  ////////////

  function sendPicture () {
    MeteorCameraUI.getPicture({}, (err, data) => {
      if (err && err.error == 'cancel') {
        return;
      }

      if (err) {
        return handleError(err);
      }

      Meteor.call('newMessage', {
        picture: data,
        type: 'picture',
        chatId: chatId
      });
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

  function sendMessage () {
    if (_.isEmpty($scope.data.message)) {
      return;
    }

    Meteor.call('newMessage', {
      text: $scope.data.message,
      type: 'text',
      chatId: chatId
    });

    delete $scope.data.message;
  }

  function inputUp () {
    if (isIOS) {
      $scope.data.keyboardHeight = 216;
    }

    $timeout(() => {
      $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);
  }

  function inputDown () {
    if (isIOS) {
      $scope.data.keyboardHeight = 0;
    }

    $ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

  function closeKeyboard () {
    // cordova.plugins.Keyboard.close();
  }
}