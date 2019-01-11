
/*
var user1 = new User("aj340", "Andres");
var user2 = new User("nunu123", "Marcos");
var user3 = new User("ejcrazy", "Elijah");
var user4 = new User("gawdknoe", "Tevin");

var upp1 = new UserPinPair(user1, "password");
var uplist = new UserPinList();
uplist.addUPPair(upp1);
uplist.addPair(user2, "nunu123");
uplist.addPair(user3, "ej123");
uplist.addPair(user4, "tdawg");
uplist.removePair(user3);


console.log(user1);
console.log(upp1);
console.log(uplist);

uplist.saveToFile();
uplist.loadFromFile();
*/

var uplist = new UserPinList();

uplist.loadFromFile();

console.log(uplist);

uplist.saveToFile();