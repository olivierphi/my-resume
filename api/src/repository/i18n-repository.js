import fs from "fs";
import { safeLoad as loadYaml } from "js-yaml";
import BaseRepository from "./base-repository";

export default class I18nRepository extends BaseRepository {
  getInternationalisationData(/** String */ lang) {
    return loadYaml(
      fs.readFileSync(`${this._dataBasePath}/i18n.${lang}.yaml`),
      "utf8"
    );
  }
}
