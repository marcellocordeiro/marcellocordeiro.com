<script lang="ts">
  import type { VariantProps } from "class-variance-authority";
  import type { HTMLFieldsetAttributes } from "svelte/elements";

  import { cn } from "@/lib/utils";

  import { buttonGroupVariants } from "./variants";

  type Props = HTMLFieldsetAttributes &
    VariantProps<typeof buttonGroupVariants>;

  const { class: className, orientation, children, ...props }: Props = $props();
</script>

<fieldset
  data-slot="button-group"
  data-orientation={orientation}
  class={cn(buttonGroupVariants({ orientation }), className)}
  {...props}
>
  {@render children?.()}
</fieldset>
