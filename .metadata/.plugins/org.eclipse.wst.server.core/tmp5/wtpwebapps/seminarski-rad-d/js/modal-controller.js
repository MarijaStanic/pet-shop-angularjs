var app = angular.module('myApp');

app.controller('UserModalCtrl', function(data, $uibModalInstance, UserService,
		SalesUnitService) {

	var self = this;
	self.data = data;
	self.roles = UserService.data.roles;
	self.salesUnits = [];
	self.submit = submit;
	self.reset = reset;

	SalesUnitService.getSalesUnits().then(function() {
		self.salesUnits = SalesUnitService.data.salesUnits;
	});

	function submit() {
		if (self.data.id == undefined) {
			createUser(self.data);
		} else {
			updateUser(self.data, self.data.id);
		}
	}

	function createUser(user) {
		UserService.createUser(user).then(function() {
			closeModal(user);
		});
	}

	function updateUser(user, id) {
		console.log(self.data);
		UserService.updateUser(user, id).then(function() {
			closeModal(user)
		});
	}

	function reset() {
		self.data = {
			firstName : '',
			lastName : '',
			address : '',
			username : '',
			password : '',
			email : ''
		};
		self.myForm.$setPristine();
		self.myForm.$setUntouched();
	}

	function closeModal(user) {
		$uibModalInstance.close(user);
	}
});

app.controller('SalesUnitModalCtrl',
		function(data, $uibModalInstance, SalesUnitService) {

			var self = this;
			self.data = data;

			self.submit = submit;
			self.reset = reset;

			function submit() {
				// console.log(self.data.id);
				if (self.data.id === undefined) {
					console.log('Saving New Sales Unit', self.data);
					createSalesUnit(self.data);
				} else {
					updateSalesUnit(self.data, self.data.id);
					console.log('Sales Unit updated with id ', self.data.id);
				}
			}

			function createSalesUnit(salesUnit) {
				SalesUnitService.createSalesUnit(salesUnit).then(
						closeModal(salesUnit));
			}

			function updateSalesUnit(salesUnit, id) {
				SalesUnitService.updateSalesUnit(salesUnit, id).then(
						closeModal(salesUnit));
			}

			function reset() {
				self.data = {
					name : '',
					address : '',
					email : '',
					phone : '',
					status : '',
				};
				self.myForm.$setPristine();
				self.myForm.$setUntouched();
			}

			function closeModal(salesUnit) {
				$uibModalInstance.close(salesUnit);
			}

		});

app.controller('CustomerModalCtrl', function(data, $uibModalInstance,
		CustomerService) {

	var self = this;
	self.data = data;
	self.submit = submit;
	self.reset = reset;

	function submit() {
		if (self.data.id == undefined) {
			console.log('Saving New Customer', self.data);
			createCustomer(self.data);
		} else {
			updateCustomer(self.data, self.data.id);
			console.log('Customer updated with id ', self.data.id);
		}
	}

	function createCustomer(customer) {
		CustomerService.createCustomer(customer).then(closeModal(customer))
	}

	function updateCustomer(customer, id) {
		CustomerService.updateCustomer(customer, id).then(closeModal(customer))
	}

	function reset() {
		console.log('reset');
		self.data = {
			firstName : '',
			lastName : '',
			birthdate : '',
			address : '',
			email : '',
			homePhone : '',
			mobilePhone : ''
		};
		self.myForm.$setPristine();
		self.myForm.$setUntouched();
	}

	function closeModal(customer) {
		$uibModalInstance.close(customer);
	}
});

app.controller('ProductModalCtrl', function(data, $uibModalInstance,
		ProductService, $controller, $scope) {

	var self = this;
	self.data = data;

	if (self.data !== undefined) {
		ProductService.supplier = self.data.supplier;
	}

	self.submit = submit;
	self.reset = reset;
	self.tabCtrl = $controller('TabCtrl', {});

	self.ProductService = ProductService;
	$scope.$watch('productModalCtrl.ProductService.supplier', function(newVal) {
		console.log('data changes into: ', newVal)
		self.data.supplier = newVal;
	});

	self.handleNext = function() {
		if (self.tabCtrl.isLastStep()) {
			submit();
		} else {
			self.tabCtrl.step += 1;
		}
	};
	
	function submit() {
		if (self.data.id == undefined) {
			console.log('Saving New Product', self.data);
			createProduct(self.data);
		} else {
			updateProduct(self.data, self.data.id);
			console.log('Product updated with id ', self.data.id);
		}
	}

	function createProduct(product) {
		ProductService.createProduct(product).then(closeModal(product))
	}

	function updateProduct(product, id) {
		ProductService.updateProduct(product, id).then(closeModal(product))
	}

	function reset() {
		self.data = {
			name : '',
			type : '',
			price : '',
			size : '',
			weight : '',
			note : ''
		};
		self.tabCtrl.setCurrentStep(0);
		ProductService.supplier = null;
		self.myForm.$setPristine();
		self.myForm.$setUntouched();
	}

	function closeModal(product) {
		ProductService.supplier = null;
		$uibModalInstance.close(product);
	}
	
	$uibModalInstance.result.then(function() {
		// Get triggers when modal is closed
	}, function() {
		ProductService.supplier = null;
	});

	self.isNextAvailable = function() {
		if (self.myForm.$invalid) {
			console.error('Invalid');
			return true;
		} else if (self.tabCtrl.isCurrentStep(1)
				&& ProductService.supplier == undefined) {
			console.error('Supplier null');
			return true;
		} else {
			console.error('Valid');
			return false;
		}
	}
});

app.controller('SupplierModalCtrl', function(data, $uibModalInstance,
		SupplierService, $scope) {

	var self = this;
	self.data = data;

	self.submit = submit;
	self.reset = reset;

	function submit() {
		console.log(self.data.id);
		if (self.data.id === null || self.data.id == undefined) {
			createSupplier(self.data);
		} else {
			updateSupplier(self.data, self.data.id);
		}
	}

	function createSupplier(supplier) {
		SupplierService.createSupplier(supplier).then(closeModal(supplier))
	}

	function updateSupplier(supplier, id) {
		SupplierService.updateSupplier(supplier, id).then(closeModal(supplier))
	}

	function reset() {
		self.data = {
			firstName : '',
			lastName : '',
			address : '',
			email : '',
			homePhone : '',
			mobilePhone : ''
		};
		self.myForm.$setPristine();
		self.myForm.$setUntouched();
	}

	function closeModal(supplier) {
		$uibModalInstance.close(supplier);
	}
});

app.controller('StockModalCtrl', function(data, $uibModalInstance,
		StockService, SalesUnitService, $controller, $scope) {

	var self = this;
	self.data = data;
	self.submit = submit;
	self.reset = reset;
	self.StockService = StockService;

	if (self.data !== undefined) {
		StockService.product = self.data.product;
	}else{
		self.data={};
	}

	$scope.$watch('stockModalCtrl.StockService.product', function(newVal) {
		self.data.product = newVal;
	});

	SalesUnitService.getSalesUnits().then(function() {
		self.salesUnits = SalesUnitService.data.salesUnits;
	});

	function submit() {
		if (self.data.id == undefined) {
			console.log('Saving New Stock', self.data);
			createStock(self.data);
		} else {
			updateStock(self.data);
			console.log('Stock updated with id ', self.data.id);
		}
	}

	function createStock(stock) {
		if(StockService.salesUnitId !== null){
			StockService.createStockForSalesUnit(stock).then(closeModal(stock))
		}else{
			StockService.createStock(stock).then(closeModal(stock))
		}
	}

	function updateStock(stock) {
		StockService.updateStock(stock).then(closeModal(stock))
	}

	function reset() {
		self.data = {
			quantity : ''
		}
		StockService.product = null;
		$scope.myForm.$setPristine();
		$scope.myForm.$setUntouched();
	}

	function closeModal(stock) {
		StockService.product = null;
		$uibModalInstance.close(stock);
	}

	$uibModalInstance.result.then(function() {
		// Get triggers when modal is closed
	}, function() {
		StockService.product = null;
	});

	self.isNextAvailable = function() {
		console.log(StockService.salesUnitId);
		console.error(self.data.salesUnit,
				StockService.product);
		if (self.myForm.$invalid) {
			 console.error('Invalid');
			return true;
		} else if ((StockService.product !== null) 
				&& ((self.data.salesUnit !== undefined) || StockService.salesUnitId !== null)) {
			 console.log('Valid');
			return false;
		} else {
			 console.error('Invalid');
			return true;
		}
	}
});

app.controller('OrderModalCtrl', function(data, $uibModalInstance, OrderService, StockService,
						$controller, $scope) {

	var self = this;
	self.data = data;

	self.orderProducts = [];
	self.stocks = [];
	self.map = {};
	self.numOfItems = 0;
	self.totalPrice = 0.0;

	self.submit = submit;
	self.reset = reset;
	self.addToOrder = addToOrder;
	self.tabCtrl = $controller('TabCtrl', {});

	getStocks();
	
	function getStocks(){
		StockService.getStocks().then(function() {
			self.stocks = StockService.data.stocks;
		});
	}
	
	self.OrderService = OrderService;
	$scope.$watch('orderModalCtrl.OrderService.customer', function(newVal) {
		console.log('data changes into: ', newVal)
		self.data.customer = newVal;
	});

	self.handleNext = function() {
		if (self.tabCtrl.isLastStep()) {
			submit();
		} else {
			self.tabCtrl.step += 1;
		}
	};

	function submit() {
		self.data.orderCreated = new Date();
		self.data.orderDelivered = null;
		self.data.quantity = self.numOfItems;
		self.data.totalPrice = self.totalPrice;
		createOrder(self.data, self.map);
	}

	function createOrder(order, orderProducts) {
		OrderService.createOrder(order, orderProducts).then(closeModal(order))
	}

	function reset() {
		self.orderProducts = [];
		self.map = {};
		getStocks();
		self.numOfItems = 0;
		self.totalPrice = 0.0;
		self.tabCtrl.setCurrentStep(0);
		OrderService.customer = null;
	}

	function closeModal(order) {
		OrderService.customer = null;
		$uibModalInstance.close(order);
	}
	
	$uibModalInstance.result.then(function() {
		// Get triggers when modal is closed
	}, function() {
		OrderService.customer = null;
	});

	self.isNextAvailable = function() {
		console.log(OrderService.customer);
		if (self.orderProducts.length == 0) {
		console.error('Invalid');
			return true;
		} else if ((self.tabCtrl.isCurrentStep(1) && OrderService.customer === null)) {
			console.error('Customer null');
			return true;
		} else {
			console.error('Valid');
			return false;
		}
	}

	function addToOrder(stock, index) {
		console.log(self);
		console.log(self.quantity[index]);
		console.log(self.quantity);
		if ((self.quantity[index] > self.stocks[index].quantity) || (self.quantity[index] <= 0) || (self.quantity[index] == undefined)) {
			self.errorMessage = "Must be greater than 0 and smaller than " + (self.stocks[index].quantity + 1);
			self.myForm['quantity_' + index].$error.validation = true;
		} else {
			self.myForm['quantity_' + index].$error.validation = false;
			stock.quantity -= self.quantity[index];
			self.numOfItems += self.quantity[index];
			self.totalPrice += stock.product.price * self.quantity[index];
			self.orderProducts.push(stock);
			self.map[stock.id] = self.quantity[index];
			stock.disabled = true;
		}
	}
});