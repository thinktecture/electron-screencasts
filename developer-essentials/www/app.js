onSampleButtonClicked = () => {
    console.log('Hello from Electron!');
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
