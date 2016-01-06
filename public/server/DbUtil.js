var sql = require('mssql'); 
var config = {
	    user: 'admEASE',
	    password: 'RkQ8oV91',
	    server: 'TSQL00', // You can use 'localhost\\instance' to connect to named instance
	    database: 'HRIS'
	    //,options: { encrypt: true }// Use this if you're on Windows Azure 
};

module.exports.getUserName = function(IdNo, done){
	//var EmpObject = {};
	sql.connect(config, function(err) {
    	var request = new sql.Request();
		console.log(IdNo);
    	var sqlString = "select Card_Na, Emp_Na from dbo.Nemployee where Id_No = '"+IdNo+"'";
    	request.query(sqlString, function(err, recordset) {
        	done(recordset[0]);
    	});
	});
	//return EmpObject;
}
