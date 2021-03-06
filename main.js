const { app, BrowserWindow, Menu, ipcMain } = require('electron');

let mainWindow;
let addGameWindow;
let addGamesWindow;




function createMainWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  //
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
  	// Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    app.quit();
    win = null
  });

  //Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
}

function createAddGameWindow () {
  // Create the browser window.
  addGameWindow = new BrowserWindow({ width: 300, height: 200 })

  // and load the index.html of the app.
  addGameWindow.loadFile('addGame.html');

 // Garbage collection handle
  addGameWindow.on('close', function() {
    addGameWindow = null;
  })
}

function createAddGamesWindow () {
  // Create the browser window.
  addGamesWindow = new BrowserWindow({ width: 300, height: 200 })

  // and load the index.html of the app.
  addGamesWindow.loadFile('addGames.html');

 // Garbage collection handle
  addGamesWindow.on('close', function() {
    addGamesWindow = null;
  })
}

//Catch item:add
ipcMain.on("game:add", function (event, game) {
  console.log(game);
  mainWindow.webContents.send("game:add", game);
  //addGameWindow.close();
});

//Catch item:add
ipcMain.on("game:addFolder", function (event, folder) {
  console.log(folder);
  mainWindow.webContents.send("game:addFolder", folder);
  //addGameWindow.close();
});

//Create menu template
var mainMenuTemplate = [
  {
    label:'File',
    submenu: [
      {
        label: 'Add Game',
        click() {
          createAddGameWindow();
        }
      },
      {
        label: 'Add Games',
        click() {
          createAddGamesWindow();
        }
      },
      {
        label: 'Edit Game'
      },
      {
        label: 'Quit',
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl&Q",
        click() {
          app.quit();
        }
      }
    ]
  }
];

// If mac add empty object to menu
/*if (process.platform == "darwin")
{
  mainMenuTemplate.unshift({});
}*/

if (process.env.NODE_ENV !== "production")
{
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl&I",
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role:'reload'
      }
    ]
  });
}




app.on('ready', createMainWindow);

/*
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
*/


