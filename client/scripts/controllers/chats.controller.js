angular
  .module('Whatsapp')
  .controller('ChatsCtrl', ChatsCtrl);

function ChatsCtrl ($scope, $reactive, $ionicModal, NewChat) {
  $reactive(this).attach($scope);

  this.showNewChatModal = showNewChatModal;
  this.remove = remove;

  this.helpers({
    chats() {
      return Chats.find();
    }
  });

  ////////////

  function showNewChatModal () {
    NewChat.showModal();
  }

  function remove (chat) {
    Meteor.call('removeChat', chat._id);
  }
}