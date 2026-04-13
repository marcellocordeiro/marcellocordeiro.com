<script lang="ts">
  import DesktopHeader from "./DesktopHeader.svelte";
  import MobileHeader from "./MobileHeader.svelte";

  interface Props {
    pathname: string;
  }

  const { pathname }: Props = $props();
</script>

<DesktopHeader class="not-md:hidden" {pathname} />
<MobileHeader class="md:hidden" {pathname} />
