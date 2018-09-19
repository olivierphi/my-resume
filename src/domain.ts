export enum Lang {
  EN = "en",
  FR = "fr",
}

export interface ResumeData {
  bio: { [lang: string]: ResumeDataBio };
  document: { [lang: string]: ResumeDataDocument };
}

export interface ResumeCurrentLangData {
  bio: ResumeDataBio;
  document: ResumeDataDocument;
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

// @see data/document.*.toml
export interface ResumeDataDocument {
  meta: ResumeDataDocumentMeta;
  punchline: string;
}
interface ResumeDataDocumentMeta {
  title: string;
  description: string;
}

export interface AppState {
  lang: Lang;
  resume: ResumeData;
}
