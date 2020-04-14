import log from "electron-log";
import fs from "fs";

class IOService {
  async write(pathname, filename, content) {
    try {
      let string = undefined;
      if (fs.existsSync(`${pathname}/${filename}`)) {
        string = fs.readFileSync(`${pathname}/${filename}`, "utf8");
      }
      if (string !== content) {
        fs.writeFileSync(`${pathname}/${filename}`, content);
      }
    } catch (error) {
      log.error(`StoreService.write:${error.message}`);
    }
  }
  async read(pathname, filename) {
    try {
      let string = fs.readFileSync(`${pathname}/${filename}`, "utf8");
      log.error(`IOService.read:${string}`);
      return string;
    } catch (error) {
      log.error(`IOService.read:${error.message}`);
      return null;
    }
  }
}

export default IOService;
