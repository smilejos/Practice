module.exports = function(){
	var count = 0;
	return {
		
		add : function(){
			count = count + 1;
			console.log('add', count);
		},
		output : function(){
			return count;
		}
	};
}();