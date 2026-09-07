<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn } from "cn";

  import { ExternalLinkIcon } from "@/config/icons.svelte";
  import { parseHref } from "@/lib/href-parser";

  interface Props extends HTMLAnchorAttributes {
    href: string;
    showExternalLinkIcon?: boolean;
  }

  const {
    class: className,
    href,
    showExternalLinkIcon,
    children,
    ...props
  }: Props = $props();

  const { isExternal, ...propsFromHref } = $derived(parseHref(href));

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
  {...propsFromHref}
  {...props}
>
  {@render children?.()}

  {#if resolvedShowExternalLinkIcon}
    <ExternalLinkIcon aria-hidden="true" />
    <span class="sr-only">(opens in a new tab)</span>
  {/if}
</a>
