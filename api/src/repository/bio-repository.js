import BaseRepository from "./base-repository";

export default class BioRepository extends BaseRepository {
  getBio(/** String */ lang) {
    return this._loadYaml("bio", lang);
  }
}
