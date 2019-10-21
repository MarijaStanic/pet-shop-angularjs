var app = angular.module('myApp', [ 'ngRoute', 'ngMessages', 'datatables',
		'ui.bootstrap', 'ui.mask' ]);

app.config(function($routeProvider) {

	$routeProvider.when('/login', {
		templateUrl : 'login',
		controller : 'LoginCtrl',
		controllerAs : 'loginCtrl'
	}).when('/home', {
		templateUrl : 'home',
		controller : 'HomeCtrl',
		controllerAs : 'homeCtrl'
	}).when('/users', {
		templateUrl : 'users',
		controller : 'UsersCtrl',
		controllerAs : 'usersCtrl',
		resolve : {
			users : function(UserService) {
				return UserService.getAllUsers();
			}
		}
	}).when('/sales-units', {
		templateUrl : '/seminarski-rad-d/sales-units/sales-units.html',
		controller : 'SalesUnitsCtrl',
		controllerAs : 'salesUnitsCtrl',
		resolve : {
			salesUnits : function(SalesUnitService) {
				return SalesUnitService.getSalesUnits();
			}
		}
	}).when('/stocks', {
		templateUrl : '/seminarski-rad-d/stocks/stocks.html',
		controller : 'StocksCtrl',
		controllerAs : 'stocksCtrl'
	}).when('/sales-units/:id/stock', {
		templateUrl : '/seminarski-rad-d/stocks/stocks.html',
		controller : 'StocksCtrl',
		controllerAs : 'stocksCtrl'
	}).when('/products', {
		templateUrl : '/seminarski-rad-d/products/products.html',
		controller : 'ProductsCtrl',
		controllerAs : 'productsCtrl'
	}).when('/suppliers', {
		templateUrl : '/seminarski-rad-d/suppliers/suppliers.html',
		controller : 'SuppliersCtrl',
		controllerAs : 'suppliersCtrl',
		resolve : {
			'MyServiceData' : function(SupplierService) {
				return SupplierService.getSuppliers();
			}
		}
	}).when('/customers', {
		templateUrl : '/seminarski-rad-d/customers/customers.html',
		controller : 'CustomersCtrl',
		controllerAs : 'customersCtrl',
		resolve : {
			customers : function(CustomerService) {
				return CustomerService.getCustomers();
			}
		}
	}).when('/orders', {
		templateUrl : '/seminarski-rad-d/orders/orders.html',
		controller : 'OrdersCtrl',
		controllerAs : 'ordersCtrl',
		resolve : {
			orders : function(OrderService) {
				return OrderService.getOrders();
			}
		}
	}).otherwise({
		redirectTo : '/home'
	})
});