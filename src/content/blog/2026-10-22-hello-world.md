---
slug: hello-world
title: Hello, World!
description: My first post, where I talk about why and how I wrote this website. Includes bad jokes.
pubDate: 2026-10-29T20:29:00-03:00
tags: [webdev, astro]
---

Hello, world! I enjoy solving problems by researching, experimenting, discussing, and sharing my progress and results with teammates and friends. I've done it a lot at work, it's rewarding to make a difference and receiving feedback on what can be improved. However, one of the suggestions I've received was that I should "own" such accomplishments more, and that stuck with me. It was an excellent suggestion, and it was the nudge I needed to put my thoughts into a more permanent and digestible format and speak my mind through writing. However, I don't consider myself a creative person, be it as a designer or as a writer, but I'll do my best so I hope you enjoy your stay!

## Background

When I was close to graduating from university all that was left was an internship. So I did a short stint at a local startup. I had no prior experience with web or mobile development, and their stack comprised of:

1. A dashboard written in pure HTML, JavaScript and CSS
2. Two multiplatform mobile apps written in React Native
3. A few embedded system firmwares for the ESP8266, written in C++, using the MQTT protocol for uploading data into a Firebase database

<!-- add info box here -->

For context, React is an UI library for building websites with reusable components in a more ergonomic way, with just JavaScript. React Native is an entire framework for building (mostly) mobile apps using React components.

I had no trouble picking up the third, as I had a reasonable amount of C++ and systems programming experience under my belt from writing [CHIP-8](https://github.com/marcellocordeiro/chip8-emulator) and [NES](https://github.com/marcellocordeiro/nes-emulator) emulators. I had _heard_ about React Native before, or rather that React was the hotness at the time, but learning the frameworks and upgrading the mobile apps to modern React Native using the latest libraries and TypeScript was a fun challenge. When it was time to do maintenance on the dashboard I felt it was going to be a different story, because the website's code had a ton of raw, unchecked and potentially unsafe HTML injected by the JavaScript code, and those patterns went completely against what I expected coming from React Native.

I had a plan though. I was young and naive, so I did the most reasonable thing anyone in my shoes would also do: I learnt about bundling with Webpack, injecting small islands of React code (in the most dynamic and _reactive_ parts), until I realised I was ready to rewrite the whole thing using React and [Vite](https://vite.dev/) (frontend build tool including bundlers and transpilers). And so I did. I reused the mix of [Bootstrap](https://getbootstrap.com/) with custom CSS, sprinkled a little bit of [Tailwind CSS](https://tailwindcss.com/), rewrote the whole code in TypeScript, and did my best to apply the best modern React and state-management patterns.

The results were pretty dang good: instant navigations without the 4-5 second delay due to the whole JavaScript code having to start from scratch (which caused constant Firebase re-authentications), several bugs--both tracked and untracked-- were fixed, and we were able to share a fair amount of code with the mobile apps.

So, that's what I've known for years. Even after landing a new job I kept up with the web dev scene: I learnt about Next.js, static site generation, server rendering, single/multi page applications (SPA/MPA) and their trade-offs, and a whole bunch of other stuff ~~(i.e., more than I can remember)~~. I could always write the code, but designing interfaces off the top of my head was the real final boss.

## The Stack™

### First experiment

Fast forward a few years, I yolo-ed and bought this domain. I was dedicated to writing the website from scratch. I knew Next.js and I knew it supported MDX. The stack was supposed to be a no-brainer:

1. Framework: Next.js
2. UI framework: Mantine UI
3. Articles: Markdown and MDX files
4. Content collections: lol

<!-- add info box here -->

For context, [Next.js](https://nextjs.org/) is a React framework to build server side rendered web apps. In a few words, it attempts to send as much HTML as possible to the user, and then send the JavaScript code to _hydrate_ the page (add interactive elements and finish rendering what the server couldn't). [Mantine](https://mantine.dev/) is a component library to spare poor souls from having to write a ton of CSS. [MDX](https://mdxjs.com/) is sort of an extension to Markdown that allows you to use JSX components in it, basically allowing you to mix Markdown with React.

What could go wrong? Well, first of all, I'm _still_ no designer, so I was having a lot of trouble coming up with a design I wanted, especially after looking into dozens of portfolios and blogs, and I was never happy with whatever I'd came up with. Second, making Next.js generate fully static pages in `{ output: "static" }` mode was difficult if I wanted to maintain a good developer experience, due to limitations from having to go "against the grain". The developer experience is very important to me because I enjoy building solid foundations to avoid having headaches or too much manual labour when iterating over it.

Unfortunately, I lost the code I had to use when gluing the Markdown file discovery with Next.js' `generateStaticParams()`, to imperatively tell the framework which pages existed so it could create the routes. It originally used Node.js file system functions with globs with `remark-frontmatter` + `remark-mdx-frontmatter` or `gray-matter` to parse and export the frontmatter (the metadata of the Markdown file, including title, slug, description and publication date).

The page itself looked a bit like this:

```tsx
type Props = PageProps<"/blog/[slug]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { Content } = post;

  return <Content />;
}

export function generateStaticParams() {
  return getBlogPostsSlugs();
}
```

Not bad. But, behind `getBlogPostsSlugs()` there was a lot of boilerplate to read the files, parse and type the frontmatter, handle media, and other things. Oh, and there was no styling yet: I didn't feel happy with Mantine, it's an excellent library but I felt I didn't have ownership over my project (100% my fault, it doesn't necessarily lock you in the styles or themes).

### Second experiment

I didn't want to settle with the spaghetti I myself had created. Therefore, I did a lot of research and came up with this:

1. Framework: Next.js
2. UI "framework": Tailwind CSS + Tailwind CSS Typography + shadcn-ui
3. Articles: Markdown and MDX files
4. Content collections: Content Collections (`content-collections`), from `content-collections`

I chose Tailwind CSS over Mantine because it's still the most popular tool for writing UIs, it has an excellent documentation, provides the Typography plugin, and shadcn-ui has become even bigger than Tailwind itself. This meant I would have an easier time with this stack since it'd be a lot easier to find examples and prior work, especially for someone who isn't particularly thrilled about CSS.

Content Collections was a rare find, because Contentlayer was traditionally recommended as the data layer, but it's unmaintained so Velite came as an alternative, however, it had some issues with Turbopack and it didn't feel ergonomic to use. Maybe it's better now though. The `content-collections.ts` code looked like this:

```ts
import { createDefaultImport, defineCollection, defineConfig } from "@content-collections/core";
import type { MDXContent } from "mdx/types";
import type { StaticImageData } from "next/image";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "src/content/blog",
  include: "**/*.{md,mdx}",
  parser: "frontmatter-only", // Let Next.js' MDX processor do all the content and plugin work
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string(),
    tags: z.array(z.string()).default([]),
    dev: z.boolean().default(false),
  }),
  transform: ({ _meta, ...post }) => {
    const Content = createDefaultImport<MDXContent>(`@/content/blog/${_meta.filePath}`);
    const image = createDefaultImport<StaticImageData>(`@/content/blog/${post.image}`);

    return {
      data: {
        ...post,
        image,
      },
      Content,
    };
  },
});

export default defineConfig({
  content: [posts],
});
```

Pretty cool, huh? It would handle finding the files, hot-reload, and do the frontmatter parsing and validation. I removed a ton of Node.js code. If you already know where this article is going you might be having déjà vu.

Great! Everyone is happy, the sun is shining, all the birds are singing. This is looking solid (not to be mistaken with Solid). And then it was time to give the blog posts some flair and add all things you'd expect from a blog post. Any website that's going to talk about code is going to need some syntax highlighting.

Then things started falling apart. There are lots of methods to support syntax highlighting, both client and server side. I wanted it to render in the server since there was no need to let the client do any work and it could be pre-rendered during build time. After a lot of research around Shiki, Prism, and the Remark/Rehype plugin system, I opted to use `@shikijs/rehype`, a Rehype plugin for Shiki. This worked great! But, again, any website like this one is legally and morally obligated to support dark theme. I used `next-themes` to handle the themes, with `light-dark()` to automatically switch between colours.

But, of course, I also needed to support the usual plugins:

```ts
const withMDX = createMDX({
  extension: /\.mdx?$/, // md and mdx
  options: {
    format: "mdx", // Keep html tags in md files
    remarkPlugins: [
      // The two frontmatter plugins were still required
      "remark-frontmatter",
      "remark-mdx-frontmatter",
      "remark-gfm", // To support the GitHub Flavored Markdown spec
      "remark-smartypants", // To convert quotes and dashes to curly quotes and em-dashes (if you see em-dashes here, those were automatically generated by this plugin)
    ],
    rehypePlugins: [
      "rehype-slug", // Slugify heading titles and add them to the `id` property
      "rehype-mdx-import-media", // Turns Markdown media into imports, so they're bundled by the tooling
      ["@shikijs/rehype", rehypeShikiOptions], // Code syntax highlighting
    ],
  },
});
```

This took me a lot of work to come up with. Sure, I want to be meticulous and make the choices count, but I wanted to use as many plugins as possible to cover the basics. For example, `remark-gfm` (GitHub Flavored Markdown) gives you a more GitHub-like flavour, `remark-smartypants` adds support to smart quotes, `rehype-slug` adds `id` attributes to headings so it's possible to use anchor tags to navigate or share a link to them, and `rehype-mdx-import-media` helps with media imports.

Phew. Can't believe it took me this long to learn how much stuff was needed that I took for granted in other websites. Maybe it would've been better to just use a meta-framework or tool like Zola. This came at a time I kept seeing the name Astro come up. It supported everything I wanted, the content collections layer, syntax highlighting, it came with all the plugins above (and more) pre-configured, and a method to collect headings to support navigations or table of contents. Some of them didn't even have plugins remark/rehype plugins that worked with the above stack! That brings us to...

### Fourth experiment

At this point, you may be wondering:

> Why don't you just roll with these, it's perfectly fine, that's what most people use!

Yeah, I get it. For better or for worse, experimenting with the goal of perfection in mind is part of my DNA. I'll never achieve perfection, ever, but it's for sure a goal. If I can get even 5% closer to it that's already a huge improvement.

I had done a ton of research about [Astro](https://astro.build/), peeked through people's code bases, and found the pitch very interesting:

- First-class Markdown/MDX support with an excellent default set of plugins
- Static site generation as the default and encouraged pattern
- Encourages you to ship as little JavaScript code as possible
- Supports mixing Astro files with React and other frameworks (but not the other way around)
- Built-in RSS support

I was sold on it. What took me days of research to come up with several plugins, while still missing some, and not without some flakiness and issues, was all handled automagically by Astro. This approach would also allow me to inject interactivity in MDX blog posts by using React or Svelte, if I didn't want to write script blocks. Therefore, here's the new stack:

1. Framework: Astro
2. UI "framework": Tailwind CSS + kinda shadcn-ui + shadcn-ui's typeset
3. Articles: Markdown and MDX files
4. Content collections: Astro's built-in solution

We made it. I promise I'll only come up with another stack after we get Half-Life 3, that's why there's no third experiment, we skipped it.

## Challenges

Coming from Next.js and React in which they are the bread and butter for most web developers and many features are either given to you or are given a different name sure had a learning curve. But my challenges weren't limited to just the stack changes. I can break them down to a few topics:

- Tooling
- Ecosystem
- Scripting
- Styling
- Theming

### Tooling

This one was a doozy. When dealing with JavaScript/TypeScript you want your codebase to follow very strict rules to ensure you're not straying away from the beaten path. React code is just JavaScript with JSX. It's the most popular library out there. I was very excited to see tools like [oxlint/oxfmt](https://oxc.rs/) and [Biome](https://biomejs.dev/), because, let's face it, [ESLint](https://eslint.org/) is a product of its time. ESLint does not provide an easy way to setup all the necessary plugins, and `typescript-eslint`, albeit very well made and documented, adds a whole other layer of complexity to your ESLint configuration, which in v9 and v10 started forcing the flat-config thus breaking the whole massive ecosystem. Plugins are also mostly maintained by many different third parties, making it easy for them to fall behind major releases.

Astro components, however, are written in `.astro` files, basically containing a frontmatter which runs TypeScript code during build time to provide data to the template which is written in JSX, and `<script>` and `<style>` blocks for scripting and styling, respectively. The newer linters do not yet support Astro files, and at best will only parse the frontmatter, but oxfmt does fully support `.astro` now!

There isn't a proper solution to this yet, so I've settled with the good old ESLint with the community-maintained plugin for Astro. This works fine, but I'm maintaining my oxlint config to jump ship as soon as I'm able to.

Other than linters, the tooling is solid. I run `astro check && tsc` to validate my Astro files using the official tooling and of course typecheck using TypeScript.

### Ecosystem

The React ecosystem is massive. The community has written (mostly) everything needed for most people to build with. Even shadcn-ui components use unstyled React libraries to provide React components, which thankfully are fully supported by Astro.

Astro's ecosystem is tiny in comparison. Resources are limited, but their docs are excellent. I had originally opted into using shadcn-ui's React components, but since I was using Astro and it steers you into writing HTML + TypeScript the old fashioned way I thought it was a good opportunity to learn something new that would be a better fit for my website, since most of it doesn't require much interactivity. So I essentially converted the shadcn-ui styles to plain CSS using data attributes.

### Scripting

Okay, I need to get something out of the way first. At the time of writing this article, the only two interactive components are the button for the mobile navigation and the theme selection buttons for dark mode. For interactive components I originally opted into learning Svelte and rewriting the shadcn-ui React components in Svelte. Svelte was interesting because it compiles into much smaller code without bundling the entire runtime and handles state in a simpler way, but not without some friction, such as not being able to easily re-use re-exported icons across both Astro and Svelte files.

I'm the kind of person who may struggle getting stuck with something I'm not 100% on board with, until I randomly stumble upon something cool and suddenly I'm **invested**. I learnt about Web Components from the Astro docs and simpler ways to handle my website's header, so I decided to port the shadcn-ui Tailwind classes to Astro components and remove as many dependencies and code from the bundle as possible. This was very cool, as it allowed me to write interactive code in a decent way without using any dependencies.

### Styling

Ah, this is what most people either love or hate. C+---sorry, CSS is a beast of its own, with decades of baggage, old patterns and hundreds of ways to achieve the same thing, each one with a different trade-off.

First of all, I'd like to give a massive shoutout to [Kevin Powell and his YouTube channel](https://www.youtube.com/kevinpowell), who taught me everything I know about CSS and just enough to get around. I'm using Tailwind CSS because of shadcn-ui and all the resources available for it, which makes it a lot easier for me to find layouts and use them in my project. There's not much to say here, except that styling and building layouts still feels difficult to me, but over time I plan on migrating to pure CSS and going into the weeds.

### Theming

This part took me very long to settle and caused me to shift between UI libraries the most. Supporting dark mode is non-negotiable to me, but I didn't want to just drop a toggle between light and dark, the plan was to support light and dark mode or match the system's theme and to _make it work well_. This meant keeping consistency with the local storage preference, meaning `system` should in fact clear the preference and let the browser figure it out:

| Website | System preference | Result |
| ------- | ----------------- | ------ |
| Light   | Any               | Light  |
| Dark    | Any               | Dark   |
| System  | Light             | Light  |
| System  | Dark              | Dark   |

You can test this yourself, by either changing your system preference or going into your browser's dev tools and simulating light or dark mode.

The hardest part of this was avoiding a FOUC (Flash of Unstyled Content), which would manifest when forcing the theme to a value different from the system and refreshing the page. It's possible to read the user preference when rendering the theme selector in the client, but by the time the script loads I'll have my readers flashbanged and that wouldn't be nice. I've looked into shadcn-ui's docs for dark mode but I felt I could do better, and it didn't work well with View Transitions. So after reading the Astro docs and looking into `next-themes` I came up with this:

```astro
<script is:inline>
  function applyTheme() {
    let theme = localStorage.getItem("theme");

    if (theme !== "light" && theme !== "dark") {
      theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    document.documentElement.dataset.theme = theme;
  }

  applyTheme();
  // Required when using Astro's ClientRouter
  document.addEventListener("astro:after-swap", applyTheme);
</script>
```

Since Astro's inline scripts are unprocessed, I couldn't import my reusable theme helpers, but this was pretty good to at least sync with the user preference before rendering for the first time.

Now we have to deal with syncing the media query for the user preference when the current theme should follow the system's preference. I wrote a `.svelte.ts` state manager and it felt very elegant:

```ts
export function createThemeContext() {
  let currentTheme: Theme | null = $state(null);
  const prefersDarkMode = new MediaQuery(DARK_MODE_MEDIA_QUERY);

  // Initial state, only run once
  onMount(() => {
    currentTheme = getSavedTheme() ?? "system";
  });

  // Media query listener
  // Should not update the local storage
  $effect(() => {
    // Make sure this dependency is registered
    // Moving this after the conditional will stop this effect from running
    const theme = prefersDarkMode.current ? "dark" : "light";

    // Only update the DOM if the user did not set any preference
    if (untrack(() => currentTheme) !== "system") {
      return;
    }

    updateDOMTheme(theme);
  });

  function handleUserSelection(value: Theme) {
    currentTheme = value;

    updateTheme(value);
  }

  return {
    get value() {
      return currentTheme;
    },
    apply(value: Theme) {
      if (value === currentTheme) {
        return;
      }

      handleUserSelection(value);
    },
  };
}
```

Compare it with the equivalent React code, which was used after migrating all the code back to React:

```tsx
export function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect
    setCurrentTheme(getSavedTheme() ?? "system");
  }, []);

  useEffect(() => {
    const mql = globalThis.matchMedia(DARK_MODE_MEDIA_QUERY);

    const onChange = () => {
      // Only update the DOM if the user did not set any preference
      if (currentTheme !== "system") {
        return;
      }

      const theme = mql.matches ? "dark" : "light";

      updateDOMTheme(theme);
    };

    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, [currentTheme]);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    updateTheme(theme);
  };

  return (
    // UI elements
  );
}
```

The React version isn't bad, but it uses a pattern that isn't recommended to use in hooks. The Svelte version feels nice but at the same time I ran into this footgun where it would ignore the media query if I didn't immediately try to access it before the current theme check, due to Svelte's awkward dependency registering.

After discovering Web Components I decided I'd try to replace all of my React code, and this is what I came up with:

```ts
class ThemeToggle extends HTMLElement {
  private mql: MediaQueryList | null = null;
  private onMqlChange = this.handleMediaQueryChange.bind(this);

  private currentTheme: Theme | null = null;

  private buttons: NodeListOf<HTMLButtonElement> | null = null;

  connectedCallback() {
    this.currentTheme = getSavedTheme() ?? "system";
    this.buttons = this.querySelectorAll("button[data-value]");

    this.syncButtons(this.currentTheme);

    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const { value } = button.dataset;

        if (!isTheme(value)) {
          console.warn(`Invalid theme value: ${value}`);
          return;
        }

        this.handleThemeChange(value);
      });
    });

    this.mql = globalThis.matchMedia(DARK_MODE_MEDIA_QUERY);
    this.mql.addEventListener("change", this.onMqlChange);
  }

  disconnectedCallback() {
    this.mql?.removeEventListener("change", this.onMqlChange);
  }

  handleMediaQueryChange() {
    if (!this.mql) {
      console.warn("mql is not initialised.");
      return;
    }

    // Only update the DOM if the user did not set any preference
    if (this.currentTheme !== "system") {
      return;
    }

    const theme = this.mql.matches ? "dark" : "light";

    updateDOMTheme(theme);
  }

  handleThemeChange(selected: Theme) {
    this.currentTheme = selected;
    updateTheme(selected);
    this.syncButtons(selected);
  }

  syncButtons(selected: Theme) {
    this.buttons?.forEach((button) => {
      const { value } = button.dataset;

      button.className = cn(
        buttonVariants({
          variant: value === selected ? "default" : "outline",
          size: "default",
        }),
      );
    });
  }
}
```

It's not perfect, there are probably bugs in it, but it works and doesn't need any UI library! It also allows querying for components only within the Web Component, so no need to write something like `document.querySelectorAll("button[data-value]")` anymore.

## Conclusion

Well, I suppose every post needs a "conclusion", but enough here to digest and give you, the reader, an idea of some of my background, motivation and hurdles when coming up with this website, and the journey is far from over! It's been a fun experience and I still have a lot to learn and a lot to do here. I'll be updating this blog post if I think I have things or jokes to add.
