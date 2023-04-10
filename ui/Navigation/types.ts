import { ReactNode } from "react";

export type NavItemType = {
  isRoot?: boolean;
  title: string;
  link: string;
  icon?: string | SVGElement | ReactNode;
  imageAlt?: string;
};

export type NavMenuType = {
  root: NavItemType;
  children?: NavMenuType[] | undefined;
  key?: string | number;
};
