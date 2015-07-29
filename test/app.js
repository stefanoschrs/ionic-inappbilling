angular.module('Testing', ['stefanoschrs.inappbilling'])
.run(['Store', function (Store){
	console.log(Store);
}]);