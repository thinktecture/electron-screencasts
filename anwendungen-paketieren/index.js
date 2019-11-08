const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');
const url = require('url');
const Memento = require('electron-memento');
let mainWindow;

function createWindow() {
    const bounds = Memento.read();
    const mainWindowConfig = {
        width: bounds.width,
        height: bounds.height,
        x: bounds.x,
        y: bounds.y,
        title: 'Electron Casts',
        webPreferences: {
            nodeIntegration: true
        },
        show: false
    };
    const mainWindowUrl = url.format({
        pathname: path.join(__dirname, 'www', 'index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow = new BrowserWindow(mainWindowConfig);
    Memento.infect(mainWindow);
    mainWindow.loadURL(mainWindowUrl);
    ipcMain.on('ping', (event, arg) => {
        event.sender.send('pong', arg + 1);
    });
    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
    });
    mainWindow.webContents.executeJavaScript(
        'window.eval = global.eval = function(){ throw new Error(`Sorry, this app does not support window.eval().`);}'
    );
    globalShortcut.register('CommandOrControl+Shift+D', () => {
        mainWindow.webContents.toggleDevTools();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('will-quit', () => {
    globalShortcut.unregister('CommandOrControl+Shift+D');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
