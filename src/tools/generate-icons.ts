// oxlint-disable node/no-sync
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { icons as fa6BrandsIcons } from "@iconify-json/fa6-brands";
import { icons as fa6SolidIcons } from "@iconify-json/fa6-solid";
import { icons as lucideIcons } from "@iconify-json/lucide";
import { type IconifyJSON } from "@iconify/types";
import { getIconData, iconToSVG, iconToHTML, stringToIcon } from "@iconify/utils";

const outDir = import.meta.dirname;

type IconSet = "lucide" | "fa6-solid" | "fa6-brands";

const iconSets: Record<IconSet, IconifyJSON> = {
  lucide: lucideIcons,
  "fa6-solid": fa6SolidIcons,
  "fa6-brands": fa6BrandsIcons,
} as const;

const iconStringSets: Record<IconSet, string[]> = {
  lucide: [
    "lucide:chevron-left",
    "lucide:chevron-right",
    "lucide:chevron-up",
    "lucide:chevron-down",

    "lucide:ellipsis",
    "lucide:menu",

    "lucide:check",
    "lucide:x",

    "lucide:monitor",
    "lucide:moon",
    "lucide:sun",

    "lucide:folder-kanban",
    "lucide:house",
    "lucide:newspaper",
    "lucide:rss",

    "lucide:arrow-up-right",
    "lucide:clock",
  ],
  "fa6-brands": ["fa6-brands:github", "fa6-brands:linkedin"],
  "fa6-solid": ["fa6-solid:envelope"],
} as const;

for (const entry of Object.entries(iconStringSets)) {
  const [iconSetPrefix, iconStrings] = entry;
  validateIconSet(iconSetPrefix);

  const prefixDir = join(outDir, iconSetPrefix);
  mkdirSync(prefixDir, { recursive: true });

  for (const iconString of iconStrings) {
    const icon = stringToIcon(iconString);

    if (icon === null) {
      throw new Error(`Invalid icon name: ${iconString}`);
    }

    const { prefix, name } = icon;
    validateIconSet(prefix);

    const iconSetData = iconSets[prefix];

    const iconData = getIconData(iconSetData, name);

    if (!iconData) {
      throw new Error("Icon does not exist");
    }

    const renderData = iconToSVG(iconData);
    const svg = iconToHTML(renderData.body, renderData.attributes);

    const file = join(outDir, prefix, `${name}.svg`);
    writeFileSync(file, svg, "utf8");
  }
}

function isIconSet(prefix: string): prefix is IconSet {
  return ["lucide", "fa6-solid", "fa6-brands"].includes(prefix);
}

function validateIconSet(prefix: string): asserts prefix is IconSet {
  if (!isIconSet(prefix)) {
    throw new Error(`Invalid icon set prefix: ${prefix}`);
  }
}
