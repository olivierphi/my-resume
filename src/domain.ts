export type LANG = "en" | "fr";

export type I18nData = Record<
  LANG,
  {
    date_format: string;
    top_links: { "pdf.download": string; language: string };
    me: { birthDate: string; phone: string; nationality?: string };
    open_source_projects: { title: string };
    education: { title: string; src: string; "src.details": string; baccalaureate: string };
    languages: Record<string, string>;
    hobbies: {
      title: string;
      content: string;
    };
    teaching: {
      title: string;
      content: string;
    };
    captions: {
      main_skills: string;
      other_skills: string;
      tools: string;
      job_experience: string;
      projects: string;
    };
    misc: {
      contributor: string;
    };
  }
>;

export type ResumeData = Record<
  LANG,
  {
    document: DocumentData;
    bio: BioData;
    jobExperience: JobExperienceData[];
    projects: ProjectData[];
  }
> & {
  technologies: Record<"main" | "others" | "tools", TechnologyData[]>;
};

export type TechnologyData = {
  title: string;
  icon?: string;
  url?: string;
  contributor_url?: string;
};

export type DocumentData = {
  punchline: string;
  meta: { title: string; description: string };
};

export type BioData = {
  name: string;
  birth: string;
  jobTitle: string;
  nationality?: string;
  address: string;
  email: string;
  phoneNumber: string;
  url: string;
  twitterId: string;
  githubId: string;
};

export type JobExperienceData = { period: string; content: string };

export type ProjectData = { title: string; content: string };
