const fs = require('fs');


function RetroGame(name, rom, savefiles)  {
	this.name = name
	this.rom = rom
	this.savefiles = savefiles
	this.available = true
	this.checkedtime = new Date()


	this.setName = function(name) {
	     this.name = name;
    }

    this.setRom = function(rom) {
	    this.rom = rom;
    }

    this.setSavefiles = function(s) {
	    this.name = s;
    }

    this.getName = function() {
	    return this.name;
    }

    this.getRom = function() {
	    return this.rom;
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

	this.addGameRaw = function (name, rom, savefiles) {
		var game1 = new RetroGame(name, rom, savefiles);

		if ( !(game1.getName() in this.retrogames) )
			this.retrogames[game1.getName()] = game1;
	}

	this.removeGame = function (key) {
		delete this.retrogames[key];
	}

	this.addFilesFromFolder = function (folder) {
		var result = fs.readdirSync(folder);
		for (var i = 0; i < result.length; i++) {
			gamename = result[i].replace(/\.[^/.]+$/, "");
			gamerom = folder + "/" + result[i];
			gamesave = "";
			this.addGameRaw(gamename, gamerom, gamesave);
		}
	}

	this.loadFromFile = function () {
		var contents = fs.readFileSync("games.txt", "utf8");
		var splitcontents = contents.split("\n");
		console.log(contents);

	    this.retrogames = {};

		for (var i = 0; i < splitcontents.length; i++) {
			splitcontents[i] = splitcontents[i].split("|");
		    var tempGame = new RetroGame(splitcontents[i][0], splitcontents[i][1], splitcontents[i][2].split(":"));
	    	this.addGame(tempGame);
		}
	}

	this.saveToFile = function () {

		var data = "";
		var allkeys = Object.keys(this.retrogames)
		for (var i = 0; i < allkeys.length; i++) {
			var tempgame = this.retrogames[allkeys[i]];
			data += tempgame.getName() + "|" + tempgame.getRom() + "|";
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