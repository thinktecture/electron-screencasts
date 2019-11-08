showNotification = () => {
    var n = new window.Notification('Hello Electron', {
        silent: false,
        body: 'Super important content'
    });

    n.onclick = () => {
        // custom code
    }
}

let interval = null;

const startPingPong = () => {
    let i = 0;
    const { ipcRenderer } = require('electron');
    ipcRenderer.on('pong', (sender, arg) => {
        i = arg;
    });
    interval = setInterval(() => {
        ipcRenderer.send('ping', i);
    }, 500);
};

const stopPingPong = () => {
    if (interval) {
        clearInterval(interval);
    }
};
