import BaseRepository from "./base-repository";

export default class TechnologiesRepository extends BaseRepository {
  getTechnologies(/** String */ lang) {
    return this._loadYaml("technologies", null);
  }
}
