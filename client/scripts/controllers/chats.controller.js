angular
  .module('Whatsapp')
  .controller('ChatsCtrl', ChatsCtrl);

function ChatsCtrl ($scope, $reactive, $ionicModal) {
  $reactive(this).attach($scope);

  this.openNewChatModal = openNewChatModal;
  this.remove = remove;

  $scope.helpers({
    chats() {
      return Chats.find();
    }
  });

  $scope.$on('$destroy', function () {
    this.modal.remove();
  });

  $ionicModal.fromTemplateUrl('client/templates/new-chat.html', {
    scope: $scope
  }).then((modal) => {
    this.modal = modal;
  });

  ////////////

  function openNewChatModal () {
    this.modal.show();
  }

  function remove (chat) {
    Meteor.call('removeChat', chat._id);
  }
}