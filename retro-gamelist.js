const fs = require('fs');


function RetroGame(name, extension, absgamepath, savefiles)  {
	this.name = name
	this.extension = extension
	this.absgamepath = absgamepath
	this.savefiles = savefiles
	this.available = true
	this.checkedtime = new Date()


	this.setName = function(name) {
	     this.name = name;
    }

	this.setExt= function(ext) {
	     this.extension = ext;
    }

    this.setGamePath = function(gamepath) {
	    this.absgamepath = gamepath;
    }

    this.setSavefiles = function(s) {
	    this.name = s;
    }

    this.getName = function() {
	    return this.name;
    }

	this.getExt= function() {
	     return this.extension;
    }

    this.getGamePath = function() {
	    return this.absgamepath;
    }

    this.getSavefiles = function() {
	    return this.savefiles;
    }

    this.markCheckedTime = function() {
	    this.checkedtime = new Date();
    }

    this.toggleAvailability = function() {
	    if ( this.available )
	    	this.available = false;
	    else
	    	this.available = true;
	    this.markCheckedTime();
    }
}

function RetroGames() {
	this.retrogames = {}

	this.getLength = function () {
		return Object.keys(this.retrogames).length;
	}

	this.getKeys = function () {
		return Object.keys(this.retrogames);
	}

	this.getValue = function (key) {
		return this.retrogames[key];
	}

	this.getRetrogames = function () {
		return this.retrogames;
	}

	this.setRetrogamesFromList = function (listofgames) {
		for (var i = 0; i < listofgames.length; i++) {
			var currentGameName = listofgames[i].getName();
			if ( !(currentGameName in this.retrogames) ) {
				this.retrogames[currentGameName] = listofgames[i];
			}
		}
	}

	this.addGame = function (game) {
		if ( !(game.getName() in this.retrogames) )
			this.retrogames[game.getName()] = game;
	}

	this.addGameRaw = function (name, extension, gamepath, savefiles) {
		var game1 = new RetroGame(name, extension, gamepath, savefiles);

		if ( !(game1.getName() in this.retrogames) )
			this.retrogames[game1.getName()] = game1;
	}

	this.removeGame = function (key) {
		delete this.retrogames[key];
	}

	this.getFilename = function (filepath) {
		file = filepath.split('\\').pop().split('/').pop();
		var lastIndex = file.lastIndexOf(".");
		if (lastIndex < 1) { 
			return "";
		}
		return file.substr(0, lastIndex);
	}

    this.getExtension = function (filepath) {
    	file = filepath.split('\\').pop().split('/').pop();
		var lastIndex = file.lastIndexOf(".");
		if (lastIndex < 1) { 
			return "";
		}
		return file.substr(lastIndex + 1);
    }

    this.isRom = function (extension) {
    	ext = extension.toLowerCase();
    	if ( ext == "gba" ||
    	     ext == "gb" ||
    	     ext == "gbc" ||
    	     ext == "nds" ||
    	     ext == "nes" || 
    	     ext == "n64" ||
    	     ext == "sfc" ||
    	     ext == "smc" ||
    	     ext == "iso" ||
    	     ext == "cso" ||
    	     ext == "bin"  )
    		return true;
    	return false;
    }

    this.addFilesFromFolder = function (folder) {
    	var result = fs.readdirSync(folder, {
			withFileTypes: "true"
		});
		for (var i = 0; i < result.length; i++) {
			var currentItem = result[i];
			if ( currentItem.isDirectory() )
				this.addFilesFromFolder(folder+"/"+currentItem.name);
			if ( currentItem.isFile() ) {
				var gameext = this.getExtension(currentItem.name);
				if ( this.isRom(gameext) ) {
					var gamename = this.getFilename(currentItem.name);
			   	 	var absgamepath = folder + "/" + currentItem.name;
			   		var gamesave = "";
			    	this.addGameRaw(gamename, gameext, absgamepath, gamesave);
				}

			}
		}
    }

	this.loadFromFile = function () {
		var contents = fs.readFileSync("games.txt", "utf8");
		var splitcontents = contents.split("\n");
		console.log(contents);

	    this.retrogames = {};

		for (var i = 0; i < splitcontents.length; i++) {
			splitcontents[i] = splitcontents[i].split("|");
		    var tempGame = new RetroGame(splitcontents[i][0], splitcontents[i][1], splitcontents[i][2], splitcontents[i][3].split(":"));
	    	this.addGame(tempGame);
		}
	}


	this.saveToFile = function () {

		var data = "";
		var allkeys = Object.keys(this.retrogames)
		for (var i = 0; i < allkeys.length; i++) {
			var tempgame = this.retrogames[allkeys[i]];
			data += tempgame.getName() + "|" + tempgame.getExt() + "|" + tempgame.getGamePath() + "|";
			var tempSavefiles = tempgame.getSavefiles();
			for (var j = 0; j < tempSavefiles.length; j++) {
				data+= tempSavefiles[j];
				if (j != tempSavefiles.length-1)
				    data+=":";
			}
			if (i != this.retrogames.length-1)
				data+="\n";
		}

    	fs.writeFileSync("games.txt", data);
	}
}