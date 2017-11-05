import BaseRepository from "./base-repository";

export default class JobExperienceRepository extends BaseRepository {
  getJobExperience(/** String */ lang) {
    return this._loadYaml("job-experience", lang);
  }
}
