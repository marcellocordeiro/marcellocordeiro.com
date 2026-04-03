import type { IconType as IconTypePrimitive } from "react-icons";
import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  LuCheck,
  LuChevronDown,
  LuChevronLeft,
  LuChevronRight,
  LuEllipsis,
  LuExternalLink,
  LuFolderKanban,
  LuHouse,
  LuMenu,
  LuMonitor,
  LuMoon,
  LuNewspaper,
  LuRss,
  LuSun,
  LuX,
} from "react-icons/lu";

export type IconType = IconTypePrimitive;

export const ChevronLeftIcon = LuChevronLeft;
export const ChevronRightIcon = LuChevronRight;
export const MoreHorizontalIcon = LuEllipsis;
export const CheckIcon = LuCheck;
export const ChevronDownIcon = LuChevronDown;
export const XIcon = LuX;

export const SystemThemeIcon = LuMonitor;
export const DarkThemeIcon = LuMoon;
export const LightThemeIcon = LuSun;

export const FolderKanbanIcon = LuFolderKanban;
export const HouseIcon = LuHouse;
export const NewspaperIcon = LuNewspaper;
export const RssIcon = LuRss;

export const ExternalLinkIcon = LuExternalLink;

export const GitHubIcon = FaGithub;
export const LinkedInIcon = FaLinkedinIn;
export const EmailIcon = FaEnvelope;

export const MenuClosedIcon = LuMenu;
export const MenuOpenIcon = LuX;
