import { getCollection, type CollectionEntry } from "astro:content";

type Project = CollectionEntry<"projects">;

const { projects } = await (async () => {
  const isDev = process.env.NODE_ENV === "development";

  const collection = await getCollection("projects");
  const sortedProjects = collection
    .filter((p) => isDev || !p.data.dev)
    .toSorted((a, b) => a.data.order - b.data.order);

  // const sortedTechnologies = [
  //   ...new Set(sortedProjects.flatMap((p) => p.data.technologies)),
  // ].toSorted();

  return { projects: sortedProjects };
})();

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.data.slug === slug);
}

export type { Project };
