<script lang="ts">
  import type { ClassValue } from "svelte/elements";

  import Link from "@/components/Link.svelte";
  import Button from "@/components/ui/button/Button.svelte";
  import { AUTHOR } from "@/config/constants";
  import { MenuClosedIcon, MenuOpenIcon } from "@/config/icons.svelte";

  import HeaderNavigationItems from "./HeaderNavigationItems.svelte";

  interface Props {
    class: ClassValue;
    pathname: string;
  }

  const { class: className, pathname }: Props = $props();

  let expandMobileNav = $state(false);
</script>

<header class={["sticky top-0 z-10 border-b", className]}>
  <nav
    class="mx-auto flex max-w-3xl flex-col items-center justify-between bg-background/80 px-10 backdrop-blur"
  >
    <div
      class="min-h-header flex w-full flex-wrap items-center justify-between"
    >
      <Link href="/">
        <span class="text-xl font-semibold">
          {AUTHOR.name}
        </span>
      </Link>

      <Button
        class={[
          "transition-transform duration-200",
          expandMobileNav ? "rotate-90" : "rotate-0",
        ]}
        variant="outline"
        size="icon"
        aria-label={expandMobileNav ? "Close menu" : "Open menu"}
        aria-expanded={expandMobileNav}
        aria-controls="mobile-nav"
        onclick={() => {
          expandMobileNav = !expandMobileNav;
        }}
      >
        {#if expandMobileNav}
          <MenuOpenIcon />
        {:else}
          <MenuClosedIcon />
        {/if}
      </Button>
    </div>

    <div
      class="hidden w-full data-[expanded=true]:block"
      id="mobile-nav"
      data-expanded={expandMobileNav}
    >
      <ul class="flex flex-col px-6 pb-4 font-medium">
        <HeaderNavigationItems class="w-full" {pathname} />
      </ul>
    </div>
  </nav>
</header>
