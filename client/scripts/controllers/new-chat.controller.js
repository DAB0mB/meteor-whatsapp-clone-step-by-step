angular
  .module('Whatsapp')
  .controller('NewChatCtrl', NewChatCtrl);

function NewChatCtrl($scope, $reactive, $state) {
  $reactive(this).attach($scope);

  $scope.hideModal = hideModal;
  $scope.newChat = newChat;

  $scope.subscribe('users');

  $scope.helpers({
    users() {
      return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
    }
  });

  ////////////

  function hideModal() {
    $scope.modal.hide();
  }

  function newChat(userId) {
    var chat = Chats.findOne({ type: 'chat', userIds: { $all: [Meteor.userId(), userId] } });
    if (chat) {
      return goToChat(chat._id);
    }

    Meteor.call('newChat', userId, goToChat);
  }

  function goToChat(chatId) {
    hideModal();
    return $state.go('tab.chat-detail', { chatId: chatId });
  }
}