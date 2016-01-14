module.exports = function(){
	var employees = [],
		sql = require('mssql'),
		config = {
		    user: 'admTest',
		    password: 'zzzzzzzz',
		    server: 'TSQL00',
		    database: 'HRIS'
		};

	var getRawDataFromDatabase = function(callback){
		var sqlString = "select a.Id_no, a.Card_Na, b.ETitle_na as Title_na  from HRIS.dbo.Nemployee a left join HRIS.dbo.ztitle b on a.Title_no = b.Title_no";
		sql.connect(config, function(err) {
			var request = new sql.Request();
	    	request.query(sqlString, function(err, recordset) {
	    		employees = recordset;
	    		callback();
	    	});
		});
	}

	return {
		initialize: function(){
			getRawDataFromDatabase(function(){
				console.log('employees', employees.length);
			});
		},
		getEmployees : function(callback){
			if( !employees || employees.length == 0 ) {
				getRawDataFromDatabase(function(){
					callback(employees);
				})
			} else  {
				callback(employees);
			}
		},
		setOnline: function(Id_No) {
			employees.filter(function(item){
				return item.Id_no == Id_No;
			})[0].OnlineState = true;
		},
		setOffline: function(Id_No) {
			employees.filter(function(item){
				return item.Id_no == Id_No;
			})[0].OnlineState = false;
		},
		getOnlineList: function() {
			var onlineList = employees.filter(function(item){
				if(item.OnlineState) {
					return true;
				} else {
					return false;
				}
			});
			return onlineList;
		}
	}
}();