import type { MDXComponents } from "mdx/types";
import Image from "next/image";

import { Link } from "@/components/link";

const components: MDXComponents = {
  img: Image,
  a: Link,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
