const { app, BrowserWindow, Menu} = require('electron');

let mainWindow;
let addItemWindow;



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

function createAddItemWindow () {
  // Create the browser window.
  addItemWindow = new BrowserWindow({ width: 300, height: 200 })

  // and load the index.html of the app.
  addItemWindow.loadFile('addItem.html');

 // Garbage collection handle
  addItemWindow.on('close', function() {
    addItemWindow = null;
  })
}

//Create menu template
var mainMenuTemplate = [
  {
    label:'File',
    submenu: [
      {
        label: 'Add Item',
        click() {
          createAddItemWindow();
        }
      },
      {
        label: 'Edit Item'
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


