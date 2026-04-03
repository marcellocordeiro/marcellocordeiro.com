<script lang="ts">
  import type { VariantProps } from "class-variance-authority";
  import type { HTMLButtonAttributes } from "svelte/elements";

  import { cn } from "@/lib/utils";

  import { buttonVariants } from "./variants";

  type Props = HTMLButtonAttributes & VariantProps<typeof buttonVariants>;

  const {
    class: className,
    variant = "default",
    size = "default",
    children,
    ...props
  }: Props = $props();
</script>

<button
  type="button"
  data-slot="button"
  class={cn(buttonVariants({ variant, size, className }))}
  {...props}
>
  {@render children?.()}
</button>
