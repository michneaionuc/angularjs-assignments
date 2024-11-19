(function () {
  'use strict';

  angular.module('common').service('UserService', UserService);

  function UserService() {
    var service = this;

    service.saveUser = function (user) {
      service.user = user;
    };
  }
})();
