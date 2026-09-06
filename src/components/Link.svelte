<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "cn";

  import { ExternalLinkIcon } from "@/config/icons.svelte";

  interface Props extends HTMLAnchorAttributes {
    showExternalLinkIcon?: boolean;
  }

  const {
    class: className,
    href,
    rel,
    target,
    showExternalLinkIcon,
    children,
    ...props
  }: Props = $props();

  const isExternal = (() => {
    if (href === undefined || href === null) {
      return false;
    }

    return !(
      href.startsWith("/") ||
      href.startsWith("?") ||
      href.startsWith("#")
    );
  })();

  const resolvedShowExternalLinkIcon = $derived(
    showExternalLinkIcon ?? isExternal,
  );
</script>

<a
  class={cn(
    resolvedShowExternalLinkIcon && "inline-flex place-items-center gap-1",
    className,
  )}
  {href}
  rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
  target={target ?? (isExternal ? "_blank" : undefined)}
  {...props}
>
  {@render children?.()}

  {#if resolvedShowExternalLinkIcon}
    <ExternalLinkIcon />
  {/if}
</a>
