
function User(un, n)  {
	this.username = un
	this.name = n

	this.setUsername = function(un) {
	     this.username = un;
    }

    this.setName = function(n) {
	    this.name = n;
    }

    this.getUsername = function() {
	    return this.username;
    }

    this.getName = function() {
	    return this.name;
    }
}

function UserPinPair (user, pin) {

	this.user = new User(user.getUsername(), user.getName())
	this.pin = pin

	this.getUser = function() {
		return this.user;
	}

	this.setUser = function(user1) {
		this.user = user1;
	}

    this.getPin = function() {
		return this.pin;
	}

	this.setPin = function(pin1) {
		this.pin = pin1;
	}
}

function UserPinList () {
	
	this.userpinlist = [];

	this.loadfromfile = function () {


	}

	this.saveToFile = function () {

		var data = "";
		for (var i = 0; i < this.userpinlist.length; i++) {
			var tempuser = this.userpinlist[i].getUser();
			data += tempuser.getUsername() + " " + tempuser.getName() + " " + this.userpinlist[i].getPin() + "\n";
		}

		let buffer = new Buffer.from(data);
    	const fs = require('fs');

    	fs.open('users.txt', 'w+', (err, fd) => {
    		if (err) 
    			throw err;
    		fs.write(fd, buffer, 0, buffer.length, null, function(err) {
    		    if (err) 
    		    	throw 'error writing file: ' + err;
    		    fs.close(fd, function () {
    			    console.log("wrote to file successfully");
    		    });
    	    });
    	});
	}

	this.addPair = function (user1, pass1) {
		var upp = new UserPinPair(user1, pass1);
		this.userpinlist.push(upp);
	}

	this.addUPPair = function(userpinpair1) {
		this.userpinlist.push(userpinpair1);
	}

	this.removePair = function(user1) {
		for (var i = 0; i < this.userpinlist.length; i++) {
			if (user1.getUsername() == this.userpinlist[i].getUser().getUsername())
				this.userpinlist.splice(i,1);
		}
	}
}