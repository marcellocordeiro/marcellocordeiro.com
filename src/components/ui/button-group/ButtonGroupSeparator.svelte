<script lang="ts">
  import type { ComponentProps } from "svelte";

  import Separator from "@/components/ui/Separator.svelte";

  type Props = ComponentProps<typeof Separator>;

  const {
    class: className,
    orientation = "vertical",
    ...props
  }: Props = $props();
</script>

<Separator
  data-slot="button-group-separator"
  data-orientation={orientation}
  class={[
    "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
    className,
  ]}
  {...props}
></Separator>
