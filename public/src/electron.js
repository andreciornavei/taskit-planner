import electron from 'electron'

import IOService from './services/io'
import WindowService from './services/window'
import WatcherService from './services/watcher'
import EventsService from './services/events'

const app = electron.app;
const firstIntance = app.requestSingleInstanceLock()

if (firstIntance) {

  var ioService = new IOService();
  var windowService = new WindowService(app)
  var watcherService = new WatcherService(ioService)
  new EventsService(windowService, watcherService, ioService)

  async function initialize() {
    windowService.start()
  }

  app.on('ready', initialize);

  app.on('window-all-closed', () => { });

} else {

  app.quit()

}

