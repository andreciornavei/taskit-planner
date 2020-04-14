import { BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import log from "electron-log";

class WindowService {
  window = undefined;
  app = undefined;
  constructor(app) {
    try {
      this.app = app;
      this.window = undefined;
    } catch (error) {
      log.error(`WindowService.constructor:${error.message}`);
    }
  }

  start() {
    try {
      if (this.window === undefined) {
        this.window = new BrowserWindow({
          width: 800,
          height: 600,
          icon: __dirname + "/../assets/icon.png",
          title: "Task.it Planner",
          autoHideMenuBar: true,
          modal: true,
          resizable: true,
          webPreferences: {
            nodeIntegration: true,
            preload: __dirname + "/../preload.js",
          },
        });
        this.window.loadURL(
          isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../../index.html")}`
        );
        this.window.on("closed", () => {
          this.stop();
        });
      }
    } catch (error) {
      log.error(`WindowService.start:${error.message}`);
    }
  }

  stop() {
    try {
      if (this.window !== undefined) {
        this.window.close();
        this.app.quit();
      }
    } catch (error) {
      log.error(`WindowService.stop:${error.message}`);
    }
  }
}

export default WindowService;
