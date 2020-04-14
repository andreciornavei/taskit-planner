import { ipcMain } from "electron";
import log from "electron-log";
import { rootPath } from 'electron-root-path';

class EventsService {
  windowService = undefined;
  ioService = undefined;
  watcherService = undefined;

  constructor(windowService, watcherService, ioService) {
    this.windowService = windowService;
    this.watcherService = watcherService;
    this.ioService = ioService;
    try {
      
      ipcMain.on("log", async (e, data) => {
        log.error(`EventsService:log:${data}`);
      });

      ipcMain.on("saveData", async (e, content) => {
        try {
          await this.ioService.write(rootPath, 'data.json', content);
        } catch (error) {
          log.error(`EventsService.updateFile:${error.message}`);
        }
      });

      ipcMain.on("loadData", async (e) => {
        try {
          let string = await this.ioService.read(rootPath, 'data.json');
          e.sender.send("onContentLoaded", string);
        } catch (error) {
          log.error(`EventsService.updateFile:${error.message}`);
        }
      });

      ipcMain.on("startListen", async (e) => {
        try {
          this.watcherService.start(rootPath, 'data.json', (content) => {
            e.sender.send("contentChange", content);
          });
        } catch (error) {
          log.error(`EventsService.startListen:${error.message}`);
        }
      });
    } catch (error) {
      log.error(`EventsService.constructor:${error.message}`);
    }
  }
}

export default EventsService;
