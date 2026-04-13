<script lang="ts">
  import Button from "@/components/ui/button/Button.svelte";
  import ButtonGroup from "@/components/ui/button-group/ButtonGroup.svelte";
  import { MonitorIcon, MoonIcon, SunIcon } from "@/config/icons.svelte";

  import { createThemeContext } from "./theme-context.svelte";

  const theme = createThemeContext();

  const themes = [
    {
      theme: "light",
      label: "Light",
      icon: SunIcon,
    },
    {
      theme: "system",
      label: "System",
      icon: MonitorIcon,
    },
    {
      theme: "dark",
      label: "Dark",
      icon: MoonIcon,
    },
  ] as const;
</script>

<ButtonGroup role="radiogroup">
  {#each themes as item (item.theme)}
    <Button
      role="radio"
      variant={item.theme === theme.value ? "default" : "outline"}
      aria-label={`Switch theme to ${item.label}`}
      onclick={() => theme.apply(item.theme)}
    >
      {@const Icon = item.icon}
      <Icon />
    </Button>
  {/each}
</ButtonGroup>
