export enum Lang {
  EN = "en",
  FR = "fr",
}

export interface ResumeData {
  bio: { [lang: string]: ResumeDataBio };
}

// @see data/bio.*.toml
export interface ResumeDataBio {
  name: string;
  birth: string;
  nationality?: string;
  address: string;
  email: string;
  phoneNumber: string;
  url: string;
  twitterId: string;
}

export interface AppState {
  lang: Lang;
  resume: ResumeData;
}
