export interface Project {
  slug: string;
  number: string;
  title: string;
  status: "live" | "thesis" | "experimental" | "private" | "contribution";
  statusLabel: string;
  hook: string;
  techStack: string[];
  metrics: string;
  links: {
    caseStudy?: string;
    appStore?: string;
    github?: string;
    live?: string;
  };
}

export interface WorkExperience {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  techStack: string[];
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface Pipeline {
  name: string;
  flow: string[];
  language: string;
  llm: string;
  status: "active" | "experimental";
}

export interface ModelEntry {
  model: string;
  provider: string;
  use: string;
}
