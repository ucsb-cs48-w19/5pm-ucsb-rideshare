

module.exports = {

	 sortByDateTimePrice: function(item1, item2) {
	//This function first sorts by date then by time then by price.
		
		if(Date.parse(item1.date) > Date.parse(item2.date)) {
			return 1;
		} else if (Date.parse(item1.date) < Date.parse(item2.date)) {
			return -1;
		} else {
			// Dates are equal. Sort by time
			if(item1.time > item2.time) {
				return 1;
			} else if (item1.time < item2.time) {
				return -1;
			} else {
				// Times are equal. Sort by price
				if(parseInt(item1.price) > parseInt(item2.price)) {
					return 1;
				} else if(parseInt(item1.price) < parseInt(item2.price)) {
					return -1;
				} else {
					// If prices are equal there is no preference on which is sorted first.
					return 0;
				}
			}
		}
	},
	
};






