declare module "~icons:astro/*" {
  const component: (props: astroHTML.JSX.SVGAttributes) => astroHTML.JSX.Element;
  export default component;
}

declare module "~icons:svelte/*" {
  import type { Component } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";

  const component: Component<SvelteHTMLElements["svg"]>;
  export default component;
}
