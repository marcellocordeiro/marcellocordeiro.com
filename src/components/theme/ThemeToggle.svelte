<script lang="ts">
  import Button from "@/components/ui/button/Button.svelte";
  import ButtonGroup from "@/components/ui/button-group/ButtonGroup.svelte";
  import { MonitorIcon, MoonIcon, SunIcon } from "@/config/icons.svelte";

  import { createThemeContext } from "./theme-context.svelte";
  import type { Theme } from "./theme";

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

  function handleThemeChange(newTheme: Theme) {
    if (newTheme === theme.value) {
      return;
    }

    theme.value = newTheme;
  }
</script>

<ButtonGroup class="transition-colors duration-100">
  {#each themes as item (item.theme)}
    <Button
      variant={item.theme === theme.value ? "default" : "outline"}
      aria-label={`Set theme to ${item.label}`}
      onclick={() => handleThemeChange(item.theme)}
    >
      {@const Icon = item.icon}
      <Icon />
    </Button>
  {/each}
</ButtonGroup>
