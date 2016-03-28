module.exports = function(){
	var sql = require('mssql'),
		config = {
		    user: 'admBlog',
		    password: 'zzzzzzzz',
		    server: 'TSQL00',
		    database: 'JustBlog'
		};

	var _getNewestArticle = function(callback){
		var sqlString = " select top 20 ArticleNo, Title, Author, Tag, Dtime from dbo.Article " + 
						" order by Dtime DESC ";
		
		sql.connect(config, function(err) {
			var request = new sql.Request();
	    	request.query(sqlString, function(err, recordset) {
	    		callback(recordset);
	    	});
		});
	}

	var _getSpecificAuthor = function(Id_No, callback){
		var sqlString = " select ArticleNo, Title, Author, Tag, Dtime from dbo.Article " + 
						" where Author = '" + Id_No + "' order by Dtime DESC ";
		
		sql.connect(config, function(err) {
			var request = new sql.Request();
	    	request.query(sqlString, function(err, recordset) {
	    		callback(recordset);
	    	});
		});
	}

	var _getSpecificTag = function(Tag, callback){
		var sqlString = " select ArticleNo, Title, Author, Tag, Dtime from dbo.Article " +
						" where Tag = '" + Tag + "' order by Dtime DESC ";
		
		sql.connect(config, function(err) {
			var request = new sql.Request();
	    	request.query(sqlString, function(err, recordset) {
	    		callback(recordset);
	    	});
		});
	}

	var _getSpecificArticle = function(ArticleNo, callback){
		var sqlString = " select ArticleNo, Title, Author, Content, Tag, Dtime " +
						" from dbo.Article where ArticleNo = '" + ArticleNo + "'";
		
		sql.connect(config, function(err) {
			var request = new sql.Request();
	    	request.query(sqlString, function(err, recordset) {
	    		callback(recordset[0]);
	    	});
		});
	}

	var _modifyArticle = function(Article, callback){
		var sqlString = " update dbo.Article set Title = '"+ Article.Title +"', Content = '" +Article.Content+ "', Tag = '" +Article.Tag+ "', Dtime = getDate() where ArticleNo = '" + Article.ArticleNo + "'";
		
		sql.connect(config, function(err) {
			var request = new sql.Request();
	    	request.query(sqlString, function(err, recordset) {
	    		callback(recordset, err);
	    	});
		});
	}

	var _publishArticle = function(Article, callback){
		var sqlString = " insert into  dbo.Article (Title, Author, Content, Tag, Dtime) "+
		                " values ('" +Article.Title +"','"+ Article.Author +"','"+ Article.Content +"','"+ Article.Tag +"', getDate())";
		
		sql.connect(config, function(err) {
			var request = new sql.Request();
	    	request.query(sqlString, function(err, recordset) {
	    		callback(recordset, err);
	    	});
		});
	}

	function _replaceString(content) {
		var regex = /'/gi;
		return content.replace(regex, "''");
	}

	return {
		getNewestArticle: function(callback){
			_getNewestArticle(callback);
		},
		getSpecificAuthor: function(Id_No, callback){
			_getSpecificAuthor(Id_No, callback);
		},
		getSpecificTag : function(Tag, callback){
			_getSpecificTag(Tag, callback);
		},
		getSpecificArticle : function(ArticleNo, callback){
			_getSpecificArticle(ArticleNo, callback);
		},
		modifyArticle : function(Article, callback){
			Article.Title = _replaceString(Article.Title);
			Article.Content = _replaceString(Article.Content);
			_modifyArticle(Article, callback);
		},
		publishArticle : function(Article, callback){
			Article.Title = _replaceString(Article.Title);
			Article.Content = _replaceString(Article.Content);
			_publishArticle(Article, callback);
		}
	}
}();