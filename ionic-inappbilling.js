angular.module('stefanoschrs.inappbilling', []).factory('Store', function (){
	/**
	 * Initialize Store Object
	 * @param  {Array}	  items Array containing the items that the user can
	 * buy in this app
	 * @param  {Function} done Callback returns error, success
	 */
	var _init = function(items, done){
		if((window.device && device.platform == "Android") && typeof inappbilling !== "undefined") {
	    	inappbilling.init(function(resultInit) {
	          	console.log("IAB Initialized");
	          	done(null, resultInit);
	      	},
	      	function(errorInit) {
	          	console.log("ERROR -> " + errorInit);
	          	done(errorInit, null);
	      	}, 
	      	{
		        showLog: true
	      	},
	      	items);
	    }
	};

	/**
	 * Retrieve user purchases
	 * @param  {Function} done Callback returns error, success
	 */
	var _getPurchases = function(done){
		if((window.device && device.platform == "Android") && typeof inappbilling !== "undefined") {
			inappbilling.getPurchases(function(result) {
            	console.log("PURCHASES -> " + JSON.stringify(result));
            	done(null, result);
          	},
          	function(errorPurchases) {
	            console.log("PURCHASE ERROR -> " + errorPurchases);
	            done(errorPurchases, null);
          	});
		}
	};

	/**
	 * Buy item from Store
	 * @param  {String}   item Item to buy
	 * @param  {Function} done Callback returns error, success
	 */
	var _buy = function(item, done){
		if((window.device && device.platform == "Android") && typeof inappbilling !== "undefined") {
			inappbilling.buy(function(resultBuy) {
	            console.log("PURCHASE SUCCESSFUL");
	            done(null, resultBuy);
	        }, function(errorBuy) {
	        	console.log("ERROR BUYING -> " + errorBuy);
	        	done(errorBuy, null);
	        }, 
			item);
		}
	}
    
	return {
		init: _init,
		getPurchases: _getPurchases,
		buy: _buy
	}
});