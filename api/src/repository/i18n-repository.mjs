import BaseRepository from "./base-repository";

export default class I18nRepository extends BaseRepository {
  getInternationalisationData(/** String */ lang) {
    return this._loadYaml("i18n", lang);
  }
}
