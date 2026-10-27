<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  import { type ButtonSize, type ButtonVariant } from "./button";

  interface Props extends HTMLButtonAttributes {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }

  const {
    class: className,
    variant = "default",
    size = "default",
    children,
    ...rest
  }: Props = $props();
</script>

<button
  type="button"
  class={["button", className]}
  data-variant={variant}
  data-size={size}
  {...rest}
>
  {@render children?.()}
</button>
