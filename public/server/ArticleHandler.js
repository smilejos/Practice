module.exports = function(){
	var sql = require('mssql'),
		config = {
		    user: 'admBlog',
		    password: 'zzzzzzzz',
		    server: 'TSQL00',
		    database: 'JustBlog'
		};

	var _getSpecificAuthor = function(Id_No){
		var sqlString = " select ArticleNo, Title, Author, Tag, Dtime from dbo.Article " + 
						" where Author = '" + Id_No + "' order by Dtime DESC ";
		
		sql.connect(config, function(err) {
			var request = new sql.Request();
	    	request.query(sqlString, function(err, recordset) {
	    		return recordset;
	    	});
		});
	}

	var _getSpecificTag = function(Tag){
		var sqlString = " select ArticleNo, Title, Author, Tag, Dtime from dbo.Article " +
						" where Tag = '" + Tag + "' order by Dtime DESC ";
		
		sql.connect(config, function(err) {
			var request = new sql.Request();
	    	request.query(sqlString, function(err, recordset) {
	    		return recordset;
	    	});
		});
	}

	var _getSpecificArticle = function(ArticleNo){
		var sqlString = " select ArticleNo, Title, Author, Content, Tag, Dtime " +
						" from dbo.Article where ArticleNo = '" + ArticleNo + "'";
		
		sql.connect(config, function(err) {
			var request = new sql.Request();
	    	request.query(sqlString, function(err, recordset) {
	    		return recordset;
	    	});
		});
	}

	var _modifyArticle = function(Article){
		var sqlString = " update dbo.Article set Title = '"+ Article.Title +"', Content = '" +Article.Content+ "', Tag = '" +Article.Tag+ "', Dtime = getDate() where ArticleNo = '" + Article.ArticleNo + "'";
		
		sql.connect(config, function(err) {
			var request = new sql.Request();
	    	request.query(sqlString, function(err, recordset) {
	    		console.log(recordset);
	    		return recordset;
	    	});
		});
	}

	var _publishArticle = function(Article){
		var sqlString = " insert into  dbo.Article (Title, Author, Content, Tag, Dtime) "+
		                " values ('" +Article.Title +"','"+ Article.Author +"','"+ Article.Content +"','"+ Article.Tag +"', getDate())";
		
		sql.connect(config, function(err) {
			var request = new sql.Request();
	    	request.query(sqlString, function(err, recordset) {
	    		console.log(recordset);
	    		return recordset;
	    	});
		});
	}

	function _replaceString(content) {
		var regex = /'/gi;
		return content.replace(regex, "''");
	}

	return {
		getSpecificAuthor: function(Id_No){
			getSpecificAuthor(Id_No, function(articles){
				return articles;
			})
		},
		getSpecificTag : function(Tag){
			getSpecificTag(Tag, function(articles){
				return articles;
			})
		},
		getSpecificArticle : function(ArticleNo){
			_getSpecificArticle(ArticleNo, function(article){
				return article;
			})
		},
		modifyArticle : function(Article){
			Article.Title = _replaceString(Article.Title);
			Article.Content = _replaceString(Article.Content);
			_modifyArticle(Article, function(article){
				return article;
			})
		},
		publishArticle : function(Article){
			Article.Title = _replaceString(Article.Title);
			Article.Content = _replaceString(Article.Content);
			_publishArticle(Article, function(article){
				return article;
			})
		}
	}
}();