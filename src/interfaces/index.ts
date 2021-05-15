import { FunctionComponent, SVGProps } from "react";
import { IconType } from "react-icons/lib";

export interface projectType {
  title: string;
  content: string;
  link: string;
  image: string;
  stack: Array<stackTypes>;
  direction?: "row" | "row-reverse";
  github?: string;
}

export type stackTypes =
  | "Go"
  | "JavaScript"
  | "Python"
  | "CSS"
  | "HTML"
  | "React"
  | "NodeJS"
  | "Docker"
  | "Mongo"
  | "Saas"
  | "Heroku"
  | "AWS"
  | "Babel"
  | "DigitalOcean"
  | "Gatsby"
  | "Git"
  | "Github"
  | "Gitlab"
  | "Gnome"
  | "GCP"
  | "Linux"
  | "Mocha"
  | "NextJS"
  | "PostgreSQL"
  | "Python"
  | "Redux"
  | "Rust"
  | "Sentry"
  | "TypeScript"
  | "Ubuntu"
  | "Vercel"
  | "WebAssembly"
  | "WebPack"
  | "WireGuard"
  | "GithubActions"
  | "DynamoDB"
  | "Firebase"
  | "Markdown"
  | "Jest"
  | "Netlify"
  | "DialogFlow"
  | "Svelte"
  | "Deno"
  | "Stripe";

export interface SocialMediaLink {
  url: string;
  icon: IconType;
}

export enum ColorTypes {
  DEFAULT = "var(--text-color)",
  NONE = "",
}

export interface Technology {
  name: stackTypes;
  Icon: IconType | FunctionComponent<SVGProps<SVGSVGElement>>;
  url: string;
  description: string;
  primaryColor: string | ColorTypes;
}
