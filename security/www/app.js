

let interval = null;
let i = 0;
const showNotification = () => {
    var n = new window.Notification('Hello Electron', {
        silent: false,
        body: 'Super important content'
    });
    n.onclick = () => {
        // custom code
    }
};

const startPingPong = () => {
    interval = setInterval(() => {
        window.bridge.ping(i);
    }, 500);
};

const stopPingPong = () => {
    if (interval) {
        clearInterval(interval);
    }
}

const openCode = () => {
    window.bridge.openCode();
};

document.addEventListener("DOMContentLoaded", (event) => {
    const pingPongButton = document.getElementById('start-ping-pong');
    const stopPingPongButton = document.getElementById('stop-ping-pong')
    const openCodeButton = document.getElementById('open-code');
    const showNotificationButton = document.getElementById('show-notification');

    pingPongButton.addEventListener('click', startPingPong.bind(this));
    stopPingPongButton.addEventListener('click', stopPingPong.bind(this));
    openCodeButton.addEventListener('click', openCode.bind(this));
    showNotificationButton.addEventListener('click', showNotification.bind(this));

    window.bridge.pong((newNumber) => {
        i = newNumber;
        console.info(i);
    });
});
