import BaseRepository from "./base-repository";

export default class DocumentRepository extends BaseRepository {
  getDocument(/** String */ lang) {
    return this._loadYaml("document", lang);
  }
}
