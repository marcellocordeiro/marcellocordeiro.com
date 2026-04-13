<script lang="ts">
  import type { ClassValue } from "svelte/elements";

  import Link from "@/components/Link.svelte";
  import { NAV_ITEMS } from "@/config/navigation-items.svelte";
  import type { Route } from "@/types";

  interface Props {
    class?: ClassValue;
    pathname: string;
  }

  const { class: className, pathname }: Props = $props();

  const isActive = (href: Route) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };
</script>

{#each NAV_ITEMS as item (item.href)}
  <li class={className}>
    <Link
      class="block rounded-3xl px-3 py-2 text-sm transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1 data-[active=true]:bg-muted/50 data-[active=true]:hover:bg-muted data-[active=true]:focus:bg-muted"
      href={item.href}
      data-active={isActive(item.href)}
      aria-label={item.label}
      aria-current={isActive(item.href) && "page"}
    >
      {item.label}
    </Link>
  </li>
{/each}
