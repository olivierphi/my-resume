import fs from "fs";
import { safeLoad as loadYaml } from "js-yaml";

export default class BaseRepository {
  constructor(/** String */ dataBasePath) {
    this._dataBasePath = dataBasePath;
  }

  _loadYaml(/** String*/ fileName, /** String*/ lang) /** String */ {
    return loadYaml(
      fs.readFileSync(`${this._dataBasePath}/${fileName}.${lang}.yaml`),
      "utf8"
    );
  }
}
