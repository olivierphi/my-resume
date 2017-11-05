import BaseRepository from "./base-repository";

export default class MyWorkRepository extends BaseRepository {
  getMyWork(/** String */ lang) {
    return this._loadYaml("my-work", lang);
  }
}
