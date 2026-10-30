<script lang="ts">
  import ButtonGroup from "@/components/ui/button-group/ButtonGroup.svelte";
  import Button from "@/components/ui/button/Button.svelte";
  import { MonitorIcon, MoonIcon, SunIcon } from "@/config/icons.svelte";

  import type { Theme } from "./theme";
  import { createThemeContext } from "./theme-context.svelte";

  const themes = [
    {
      theme: "light",
      label: "Light",
      Icon: SunIcon,
    },
    {
      theme: "system",
      label: "System",
      Icon: MonitorIcon,
    },
    {
      theme: "dark",
      label: "Dark",
      Icon: MoonIcon,
    },
  ] as const;

  const theme = createThemeContext();

  function handleThemeChange(newTheme: Theme) {
    if (newTheme === theme.value) {
      return;
    }

    theme.value = newTheme;
  }
</script>

<ButtonGroup role="radiogroup">
  {#each themes as item (item.theme)}
    <Button
      class="button-group-item"
      role="radio"
      variant={item.theme === theme.value ? "default" : "outline"}
      data-value={item.theme}
      aria-label={`Set theme to ${item.label}`}
      aria-checked={item.theme === theme.value ? "true" : "false"}
      onclick={() => handleThemeChange(item.theme)}
    >
      <item.Icon />
    </Button>
  {/each}
</ButtonGroup>
