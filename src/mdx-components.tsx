import type { MDXComponents } from "mdx/types";
import Image from "next/image";

const components: MDXComponents = {
  img: Image,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
