<script lang="ts">
  import type { ClassValue } from "svelte/elements";

  import Link from "@/components/Link.svelte";
  import { AUTHOR } from "@/config/constants";

  import HeaderNavigationItems from "./HeaderNavigationItems.svelte";

  interface Props {
    class: ClassValue;
    pathname: string;
  }

  const { class: className, pathname }: Props = $props();
</script>

<header class={["sticky top-0 z-10 border-b", className]}>
  <nav
    class="min-h-header mx-auto flex max-w-3xl items-center justify-between bg-background/80 px-10 backdrop-blur"
  >
    <Link href="/">
      <span class="text-xl font-semibold whitespace-nowrap">{AUTHOR.name}</span>
    </Link>

    <ul class="flex gap-4 rounded font-medium">
      <HeaderNavigationItems {pathname} />
    </ul>
  </nav>
</header>
