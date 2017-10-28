import fs from "fs";
import { safeLoad as loadYaml } from "js-yaml";
import BaseRepository from "./base-repository";

export default class BioRepository extends BaseRepository {
  getBio(/** String */ lang) {
    return loadYaml(
      fs.readFileSync(`${this._dataBasePath}/bio.${lang}.yaml`),
      "utf8"
    );
  }
}
