<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";

  import { cn } from "@/lib/utils";

  interface Props extends Omit<SvelteHTMLElements["div"], "children"> {
    orientation?: "horizontal" | "vertical";
  }

  const {
    class: className,
    orientation = "horizontal",
    ...props
  }: Props = $props();
</script>

<div
  data-slot="separator"
  data-orientation={orientation}
  // role="separator"
  // aria-orientation={orientation}
  class={cn(
    "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
    className,
  )}
  {...props}
></div>
