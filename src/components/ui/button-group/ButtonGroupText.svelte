<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";

  import { cn } from "@/lib/utils";

  type DivProps = SvelteHTMLElements["div"];
  interface Props extends DivProps {
    orientation?: "horizontal" | "vertical";
  }

  const { class: className, children, ...props }: Props = $props();
</script>

<div
  class={cn(
    "flex items-center gap-2 rounded-4xl border bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
    className,
  )}
  data-slot="button-group-text"
  {...props}
>
  {@render children?.()}
</div>
