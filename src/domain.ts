export enum Lang {
  EN = "en",
  FR = "fr",
}

export interface ResumeData {
  bio: { [lang: string]: ResumeDataBio };
  document: { [lang: string]: ResumeDataDocument };
  technologies: ResumeDataTechnologies;
  jobExperience: { [lang: string]: ResumeDataJobExperience[] };
  projects: { [lang: string]: ResumeDataProject[] };
}

export interface ResumeCurrentLangData {
  bio: ResumeDataBio;
  document: ResumeDataDocument;
  technologies: ResumeDataTechnologies;
  jobExperience: ResumeDataJobExperience[];
  projects: ResumeDataProject[];
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

// @see data/technologies.toml
export interface ResumeDataTechnologies {
  main: ResumeDataTech[];
  others: ResumeDataTech[];
  tools: ResumeDataTech[];
}

export interface ResumeDataTech {
  name: string;
  icon?: string;
  url?: string;
  contributor_url?: string;
}

// @see data/job-experience.*.toml
export interface ResumeDataJobExperience {
  period: string;
  content: string;
}

// @see data/projects.*.toml
export interface ResumeDataProject {
  title: string;
  content: string;
}

export interface AppState {
  lang: Lang;
  resume: ResumeData;
  buildTime?: string | null;
}
