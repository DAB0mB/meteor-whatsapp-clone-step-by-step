angular
  .module('Whatsapp')
  .controller('ChatCtrl', ChatCtrl);

function ChatCtrl ($scope, $reactive, $stateParams, $ionicScrollDelegate, $timeout, $ionicPopup, $log) {
  $reactive(this).attach($scope);

  let chatId = $stateParams.chatId;
  let isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  this.data = {};
  this.sendMessage = sendMessage;
  this.inputUp = inputUp;
  this.inputDown = inputDown;
  this.closeKeyboard = closeKeyboard;
  this.sendPicture = sendPicture;

  this.helpers({
    messages() {
      return Messages.find({ chatId: chatId });
    },
    description() {
      return Chats.findOne(chatId);
    },
  });

  $scope.$watchCollection('conversation.messages', (oldVal, newVal) => {
    let animate = oldVal.length !== newVal.length;
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
    if (_.isEmpty(this.data.message)) {
      return;
    }

    Meteor.call('newMessage', {
      text: this.data.message,
      type: 'text',
      chatId: chatId
    });

    delete this.data.message;
  }

  function inputUp () {
    if (isIOS) {
      this.data.keyboardHeight = 216;
    }

    $timeout(() => {
      $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
    }, 300);
  }

  function inputDown () {
    if (isIOS) {
      this.data.keyboardHeight = 0;
    }

    $ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

  function closeKeyboard () {
    // cordova.plugins.Keyboard.close();
  }
}