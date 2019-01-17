const fs = require('fs');


function RetroGame(name, rom, savefiles)  {
	this.name = name
	this.rom = rom
	this.savefiles = savefiles


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
}

function RetroGames() {
	this.retrogames = []

	this.getLength = function () {
		return this.retrogames.length;
	}

	this.getRetrogames = function () {
		return this.retrogames;
	}

	this.setRetrogamesFromList = function (listofgames) {
		this.retrogames = listofgames;
	}

	this.addGame = function (game) {
		this.retrogames.push(game);
	}

	this.addGameRaw = function (name, rom, savefiles) {
		var game1 = new RetroGame(name, rom, savefiles);
		this.retrogames.push(game1);
	}

	this.removeGame = function (i) {
		this.retrogames.splice(i, 1);
	}

	this.loadFromFile = function () {
		var contents = fs.readFileSync("games.txt", "utf8");
		var splitcontents = contents.split("\n");
		console.log(contents);

	    this.retrogames = [];

		for (var i = 0; i < splitcontents.length; i++) {
			splitcontents[i] = splitcontents[i].split("|");
		    var tempGame = new RetroGame(splitcontents[i][0], splitcontents[i][1], splitcontents[i][2].split(":"));
	    	this.addGame(tempGame);
		}
	}

	this.saveToFile = function () {

		var data = "";
		for (var i = 0; i < this.retrogames.length; i++) {
			var tempgame = this.retrogames[i];
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