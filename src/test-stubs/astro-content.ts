/** Vitest stub for Astro content collections. */
export async function getCollection(): Promise<never[]> {
  return [];
}

export type CollectionEntry<T extends string = string> = {
  id: string;
  slug: string;
  body: string;
  collection: T;
  data: Record<string, unknown>;
  render: () => Promise<{ Content: unknown }>;
};
