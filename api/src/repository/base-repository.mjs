import fs from "fs";
import yaml from "js-yaml";

export default class BaseRepository {
  constructor(/** String */ dataBasePath) {
    this._dataBasePath = dataBasePath;
  }

  _loadYaml(/** String*/ fileName, /** String*/ lang) /** String */ {
    return yaml.safeLoad(
      fs.readFileSync(`${this._dataBasePath}/${fileName}${lang ? `.${lang}` : ''}.yaml`),
      "utf8"
    );
  }
}
