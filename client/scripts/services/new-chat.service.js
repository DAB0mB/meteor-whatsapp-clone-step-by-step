angular
  .module('Whatsapp')
  .service('NewChat', NewChat);

function NewChat($rootScope, $ionicModal) {
  let templateUrl = 'client/templates/new-chat.html';

  this.showModal = function() {
    this._scope = $rootScope.$new();

    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: this._scope
    }).then((modal) => {
      this._modal = modal;
      modal.show();
    });
  };

  this.hideModal = function() {
    this._scope.$destroy();
    this._modal.remove();
  };
}