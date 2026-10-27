<script lang="ts">
  import type { HTMLFieldsetAttributes } from "svelte/elements";

  interface Props extends HTMLFieldsetAttributes {
    orientation?: "horizontal" | "vertical";
  }

  const { class: className, orientation = "horizontal", children, ...rest }: Props = $props();
</script>

<fieldset
  class={["button-group", className]}
  data-slot="button-group"
  data-orientation={orientation}
  {...rest}
>
  {@render children?.()}
</fieldset>
