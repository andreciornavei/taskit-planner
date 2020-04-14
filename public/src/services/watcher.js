import chokidar from "chokidar";
import log from "electron-log";

class WatcherService {
  watcher = undefined;
  ioService = undefined;

  constructor(ioService) {
    try {
      this.watcher = undefined;
      this.ioService = ioService;
    } catch (error) {
      log.error(`WatcherService.constructor:${error.message}`);
    }
  }

  async start(watchPath, watchFile, onChange) {
    log.error("Start watching on path => ", watchPath);
    this.stop();
    try {
      this.watcher = chokidar.watch(watchPath, {
        ignored: /(^|[\/\\])\../,
        depth: 0,
        persistent: true,
      });
      // Declare the listeners of the watcher
      this.watcher
        .on("add", async (path) => {
          //log.error("File", path, "has been added");
        })
        .on("change", async (path) => {
          if (path === `${watchPath}/${watchFile}`) {
            log.error("File", path, "has been changed");
            const content = await this.ioService.read(watchPath, watchFile);
            onChange(content);
          }
        })
        .on("unlink", async (path) => {
          if (path === `${watchPath}/${watchFile}`) {
            log.error("File", path, "has been removed");
            onChange(null);
          }
        })
        .on("error", async (error) => {
          log.error("Error happened", error);
        })
        .on("ready", this.onReady);
    } catch (error) {
      log.error(`WatcherService.start:${error.message}`);
    }
  }

  stop() {
    try {
      if (this.watcher !== undefined) {
        this.watcher.close();
        this.watcher = undefined;
      }
    } catch (error) {
      log.error(`WatcherService.stop:${error.message}`);
    }
  }

  onReady() {
    //console.info('From here can you check for real changes, the initial scan has been completed.')
  }
}

export default WatcherService;
