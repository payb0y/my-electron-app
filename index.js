const { app, BrowserWindow } = require("electron");
const { autoUpdater } = require("electron-updater");

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile("index.html");

    // Check for updates after mainWindow is ready to be shown
    mainWindow.once("ready-to-show", () => {
        autoUpdater.checkForUpdatesAndNotify();
    });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

autoUpdater.on("error", (error) => {
    console.error("Update error:", error);
});

autoUpdater.on("update-available", () => {
    console.log("Update available.");
});

autoUpdater.on("update-not-available", () => {
    console.log("No update available.");
});

autoUpdater.on("update-downloaded", () => {
    console.log("Update downloaded; will install now");
});
