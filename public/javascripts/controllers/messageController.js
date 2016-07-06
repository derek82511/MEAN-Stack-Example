angular.module('app').controller('MessageController', ['MessageApi', 'UserManager', function(MessageApi, UserManager){

	var self = this;

	init();

	function init(){
		self.input = {
			content: ''
		};

		getMessages();
	}

	function getMessages(){
		MessageApi.getMessages(UserManager.user._id, function(data){
			self.messages = data;
		});
	}

	this.create = function(){
		var message = {
			content: self.input.content,
			userId: UserManager.user._id
		};

		MessageApi.addMessage(message, function(data){
			self.messages.push(data);
	        self.input.content = '';
		});
	};

	this.edit = function(message){
		var text = document.getElementById('text_' + message._id);
		var button = document.getElementById('button_' + message._id);

		if(message.edit){
			text.setAttribute('disabled', 'true');
			button.className = 'btn btn-default';
			message.edit = false;

			MessageApi.updateMessage(message, function(data){
				message = data;
			});
		}else{
			text.removeAttribute('disabled');
			button.className = 'btn btn-primary';
			message.edit = true;
		}
	};

	this.delete = function(message){
		MessageApi.deleteMessage(message, function(){
			getMessages();
		});
	};

}]);