module.exports = function(){
	var MemberControler = require('../server/MemberControler');
	MemberControler.initialize();

	function _login(client, item) {
        client.request.session.user.UserName = item.IdNo;
        var self = MemberControler.setOnline(item.IdNo, client.id); 
        client.emit('receiveRealTimeMember', {
            list : MemberControler.getOnlineList(),
            self : self
        });
    };

    function _sendMessage(client, item) {
        client.to(item.target).emit('receiveMessage', {
            sender : client.request.session.user.UserName,
            message : item.message,
            dateTime : item.dateTime
        });
    };

     function _openChat(client, item) {
        client.to(item.target).emit('openChat', {
            target: item.target,
            Id_No: client.request.session.user.UserName
        });
    };

    function _disconnect(client) {
        console.log('Common disconnect', client.id);
        if(client.request.session.user && client.request.session.user.UserName){
            MemberControler.setOffline(client.request.session.user.UserName);
            client.emit('receiveRealTimeMember', {
                list :  MemberControler.getOnlineList()
            });    
        }
    };

	return {
		listen: function(client) {
			console.log('Common connected', client.id);
			// var user = client.request.session.user;
		    // if( user) {
		    //     var IdNo = user.UserName;
		    //     MemberControler.setOnline(IdNo);    
		    // }

		    // socket.emit('receiveRealTimeMember', {
		    //     List :  MemberControler.getOnlineList()
		    // });

			client.on('login', function(item) {
		        _login(client, item);
		    });

	     	client.on('openChat', function(item) {
		       	_openChat(client, item);
		    });

		    client.on('sendMessage', function(item) {
		    	_sendMessage(client, item);
		    }); 

		    client.on('disconnect', function() {
		       _disconnect(client);
		    });
		}
	};
}();
