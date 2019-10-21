var app = angular.module('myApp');

app.controller('IndexCtrl', [ '$scope', '$location', 'sessionService',
		function($scope, $location, sessionService) {

			if (!$scope.logged) {
				$location.path('/login');
			} else {
				$location.path('/home');
			}

			$scope.isActive = function(viewLocation) {
				var active = (viewLocation === $location.path());
				return active;
			};

			$scope.isAuthorised = function(allowedRoles) {
				var roles = allowedRoles.split(',');
				for (var i = 0; i < roles.length; i++) {
					allowed = sessionService.isAuthorised(roles[i]);
					if (allowed) {
						return true;
					}
				}
				return false;
			}
		} ]);

app.controller('LoginCtrl', [ '$rootScope', '$scope', '$http', '$location',
		'sessionService',
		function($rootScope, $scope, $http, $location, sessionService) {

			$rootScope.error = false;
			var vm = this;
			vm.username = undefined;
			vm.password = undefined;

			vm.login = function() {
				var config = {
					params : {
						username : vm.username,
						password : vm.password
					}
				}
				sessionService.login(config).then(function(response) {
					$rootScope.logged = true;
					vm.loggedUser = sessionService.getUser();
					console.log(vm.loggedUser);
					$location.path('/home');
				}, function(response) {
					$rootScope.logged = false;
					$rootScope.error = true;
				});
			}
		} ]);

app.controller('HomeCtrl', [
		'UserService',
		'$rootScope',
		'sessionService',
		function(UserService, $rootScope, sessionService) {

			var self = this;
			self.loggedUser = {};
			self.loggedUser = sessionService.getUser();
			self.user = {
				id : self.loggedUser.id,
				firstName : self.loggedUser.firstName,
				lastName : self.loggedUser.lastName,
				address : self.loggedUser.address,
				email : null,
				username : self.loggedUser.username,
				password : self.loggedUser.password,
				roles : self.loggedUser.roles,
				salesUnit : self.loggedUser.salesUnit
			};
			console.log(self.user);
			self.updateUser = updateUser;

			function updateUser() {
				UserService.updateUser(self.user, self.user.id).then(
						function(response) {
							self.loggedUser.email = self.user.email;
							self.user.email = null;
						}, function(errResponse) {
							console.error('Error while updating User');
						});
			}
		} ]);

app.controller('UsersCtrl', [
		'$scope',
		'UserService',
		'$uibModal',
		function($scope, UserService, $uibModal) {

			var self = this;
			self.users;

			self.remove = remove;
			self.popup = popup;

			getAllUsers();

			function getAllUsers() {
				UserService.getAllUsers().then(function(response) {
					self.users = response.data;
				}, function(error) {
					alert(error.data);
				});
			}

			/*
			 * function edit(id){ console.log('id to be edited', id); for(var i =
			 * 0; i < self.users.length; i++){ if(self.users[i].id === id) {
			 * self.user = angular.copy(self.users[i]); break; } } }
			 */
			function remove(id) {
				console.log('id to be deleted', id);
				deleteUser(id);
			}

			function deleteUser(id) {
				UserService.deleteUser(id).then(getAllUsers,
						function(errResponse) {
							console.error('Error while deleting User');
						});
			}

			function popup(type, object, index) {
				var modalInstance = $uibModal.open({
					templateUrl : 'users/modals/userModal.html',
					controller : 'UserModalCtrl',
					controllerAs : 'modalCtrl',
					resolve : {
						data : function() {
							return angular.copy(object);
						}
					}
				});
				modalInstance.result.then(function(user) {
					if (index === null) {
						self.users.push(user);
						return;
					}
					console.log('user = ' + user.firstName + ' Finished at: '
							+ new Date());
					self.users[index] = user;
				}, function() {
					console.log('Modal dismissed at: ' + new Date());
				});
			}
		} ]);

app.controller('SalesUnitsCtrl', function() {

	var self = this;
});

app.controller('OrdersCtrl', function() {

	var self = this;
});