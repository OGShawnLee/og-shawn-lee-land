import ProjectCard  from './ProjectCard.svelte';
import ProjectSection  from './ProjectSection.svelte';

export { default as GitHubLink } from './GitHubLink.svelte';
export { default as IconLink } from './IconLink.svelte';
export namespace Project {
  export const Card = ProjectCard;
  export const Section = ProjectSection;
}
export { default as Technology } from './Technology.svelte';
export { default as WebsiteLink } from './WebsiteLink.svelte';