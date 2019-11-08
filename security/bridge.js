const { ipcRenderer, shell } = require('electron');

window.bridge = {
    openCode: () => {
        shell.openExternal('https://github.com/thinktecture');
    },
    ping: (num) => {
        ipcRenderer.send('ping', num);
    },
    pong: (callback) => {
        if (callback) {
            ipcRenderer.on('pong', (sender, arg) => {
                callback(arg);
            });
        }
    }
};
