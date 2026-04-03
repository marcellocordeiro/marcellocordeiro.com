import { themes } from "@/components/theme/theme";
import { useTheme } from "@/components/theme/use-theme";
import { ButtonGroup } from "@/components/ui/button-group/button-group";
import { Button } from "@/components/ui/button/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ButtonGroup>
      {themes.map((item) => (
        <Button
          key={item.theme}
          variant={item.theme === theme ? "default" : "outline"}
          onClick={() => setTheme(item.theme)}
        >
          <item.icon />
        </Button>
      ))}
    </ButtonGroup>
  );
}
