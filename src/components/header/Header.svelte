<script lang="ts">
  import Link from "@/components/Link.svelte";
  import Button from "@/components/ui/button/Button.svelte";
  import { AUTHOR } from "@/config/constants";
  import { MenuClosedIcon, MenuOpenIcon } from "@/config/icons.svelte";
  import { cn } from "@/lib/utils";

  import HeaderNavigationItems from "./HeaderNavigationItems.svelte";

  interface Props {
    pathname: string;
  }

  const { pathname }: Props = $props();

  let expandMobileNav = $state(false);
</script>

<header
  class="sticky top-0 z-20 w-full border-b bg-background/80 backdrop-blur"
>
  <nav
    class="min-h-header mx-auto flex max-w-3xl flex-wrap items-center justify-between p-4"
  >
    <Link href="/">
      <span class="text-xl font-semibold whitespace-nowrap">{AUTHOR.name}</span>
    </Link>

    <Button
      class={cn(
        "transition-transform duration-200 md:hidden",
        expandMobileNav ? "rotate-90" : "rotate-0",
      )}
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

    <div
      class="hidden w-full data-[expanded=true]:block md:block md:w-auto"
      id="mobile-nav"
      data-expanded={expandMobileNav}
    >
      <ul
        class="flex rounded font-medium not-md:mt-4 not-md:flex-col not-md:border not-md:bg-background/80 not-md:p-4 md:space-x-8"
      >
        <HeaderNavigationItems {pathname} />
      </ul>
    </div>
  </nav>
</header>
