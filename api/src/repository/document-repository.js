import fs from "fs";
import { safeLoad as loadYaml } from "js-yaml";
import BaseRepository from "./base-repository";

export default class DocumentRepository extends BaseRepository {
  getDocument(/** String */ lang) {
    return loadYaml(
      fs.readFileSync(`${this._dataBasePath}/document.${lang}.yaml`),
      "utf8"
    );
  }
}
