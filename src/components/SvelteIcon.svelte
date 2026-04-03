<script lang="ts">
  import type { Component } from "svelte";

  interface Props {
    icon: Component;
  }

  const { icon: Icon }: Props = $props();
</script>

<Icon />
