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

<header
  class={[
    "sticky top-0 z-10 border-b bg-background/80 backdrop-blur",
    className,
  ]}
>
  <div
    class="min-h-header mx-auto flex max-w-3xl items-center justify-between px-4"
  >
    <Link class="text-xl font-semibold" href="/">
      {AUTHOR.name}
    </Link>

    <nav>
      <ul class="flex gap-4 rounded font-medium">
        <HeaderNavigationItems {pathname} />
      </ul>
    </nav>
  </div>
</header>
