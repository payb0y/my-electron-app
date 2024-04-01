const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Load index.html of the app.
    win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("ready", () => {
    autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
    // Quit and install the update after it is downloaded
    autoUpdater.quitAndInstall();
});
