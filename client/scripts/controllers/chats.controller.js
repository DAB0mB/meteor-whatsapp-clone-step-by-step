angular
  .module('Whatsapp')
  .controller('ChatsCtrl', ChatsCtrl);

function ChatsCtrl ($scope, $reactive, $ionicModal) {
  $reactive(this).attach($scope);

  $scope.openNewChatModal = openNewChatModal;
  $scope.remove = remove;

  $scope.helpers({
    chats() {
      return Chats.find();
    }
  });

  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  $ionicModal.fromTemplateUrl('client/templates/new-chat.html', {
    scope: $scope
  }).then((modal) => {
    $scope.modal = modal;
  });

  ////////////

  function openNewChatModal () {
    $scope.modal.show();
  }

  function remove (chat) {
    $meteor.call('removeChat', chat._id);
  }
}