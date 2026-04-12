export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  liveUrl: string;
  githubUrl?: string;
  image: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  dates: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface Skill {
  name: string;
  category: string;
}
