<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";

  import { ArrowUpRightIcon } from "@/config/icons.svelte";
  import { parseHref } from "@/lib/href-parser";

  interface Props extends HTMLAnchorAttributes {
    href: Route;
    showExternalLinkIcon?: boolean;
  }

  const { class: className, showExternalLinkIcon, href, children, ...rest }: Props = $props();

  const { isExternal, ...propsFromHref } = $derived(parseHref(href));
  const resolvedShowExternalLinkIcon = $derived(showExternalLinkIcon ?? isExternal);
</script>

<a class={["link", className]} {href} {...propsFromHref} {...rest}>
  {@render children?.()}

  {#if resolvedShowExternalLinkIcon}
    <ArrowUpRightIcon data-icon="inline-end" aria-hidden="true" />
  {/if}

  {#if isExternal}
    <span class="sr-only">(opens in a new tab)</span>
  {/if}
</a>
