
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

function UserPasswordPair (user, pw) {

	this.user = new User(user.getUsername(), user.getName())
	this.password = pw

	this.getUser = function() {
		return this.user;
	}

	this.setUser = function(user1) {
		this.user = user1;
	}

    this.getPw = function() {
		return this.password;
	}

	this.setPw = function(pw1) {
		this.password = pw1;
	}
}

function UserPwList () {
	
	this.userpwlist = [];

	this.addPair = function (user1, pass1) {
		var upp = new UserPasswordPair(user1, pass1);
		this.userpwlist.push(upp);
	}

	this.addUPPair = function(userpwpair1) {
		this.userpwlist.push(userpwpair1);
	}

	this.removePair = function(user1) {
		for (var i = 0; i < this.userpwlist.length; i++) {
			if (user1.getUserName() == this.userpwlist[i].getUserName())
				this.userpwlist.splice(i,1);
		}
	}
}