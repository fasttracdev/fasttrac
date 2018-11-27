module.exports.transformForPagination = function(res, link) {
	let usersData = {};
	var drivers = [];
	res.data.forEach(function(element) {
	  	drivers.push(JSON.parse(element.user_meta));
	});
    usersData = {
    	data: drivers,
    	meta: {
    		pagination: {
	            total: res.total,
	            count: res.perPage,
	            per_page: res.perPage,
	            current_page: res.currentPage,
	            total_pages: res.totalPages
	        }
    	},
    	links: {
    		self: link + '?limit='+ res.perPage + '&page=' + res.currentPage,
	        first: link + '?limit='+ res.perPage + '&page=1',
	        next: (res.currentPage === res.totalPages) ? null : link + '?limit='+ res.perPage + '&page=' + res.currentPage++,
	        last: (res.currentPage === res.totalPages) ? null : link + '?limit='+ res.perPage + '&page=' + res.totalPages
    	}
  	};
	
	return usersData;
}