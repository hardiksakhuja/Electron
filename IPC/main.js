console.log('from main.js');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path')
const url = require('url')
const ipc = electron.ipcMain;

const dialog = electron.dialog;


let win;

function createWindow() {
    win = new BrowserWindow({
        webPreferences: {
            nativeWindowOpen: true,
            nodeIntegration: true
        }
    });   
    win.loadURL(url.format({
        pathname: path.join(__dirname,'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    })
    
}
ipc.on('async-message', function(event) {
    // dialog.showErrorBox('An error message','Demo of an error message');
    event.sender.send('async-reply','Main process opened the error dialog')
})

ipc.on('sync-message', function(event) {
    event.returnValue='sync-reply';
})


app.on('ready',createWindow);
