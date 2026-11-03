import {
  OcticonAlertIcon,
  OcticonInfoIcon,
  OcticonLightBulbIcon,
  OcticonReportIcon,
  OcticonStopIcon,
} from "@/config/icons";

export type GithubAlertType = keyof typeof githubAlertMappings;

export const githubAlertMappings = {
  note: {
    className: "markdown-alert markdown-alert-note",
    title: "Note",
    Icon: OcticonInfoIcon,
  },
  tip: {
    className: "markdown-alert markdown-alert-tip",
    title: "Tip",
    Icon: OcticonLightBulbIcon,
  },
  important: {
    className: "markdown-alert markdown-alert-important",
    title: "Important",
    Icon: OcticonReportIcon,
  },
  warning: {
    className: "markdown-alert markdown-alert-warning",
    title: "Warning",
    Icon: OcticonAlertIcon,
  },
  caution: {
    className: "markdown-alert markdown-alert-caution",
    title: "Caution",
    Icon: OcticonStopIcon,
  },
};
