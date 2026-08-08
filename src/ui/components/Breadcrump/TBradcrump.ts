import { UIMatch } from "react-router-dom";

export type TBreadcrumpList = {
  breadcrumpList: string[];
  title: string;
};

export type TBreadcrump = {
  className?: string;
};

export type TCustomRouteHandle = {
  breadcrumb: string | ((match: TExpandedMatch) => string);
  title?: string | ((match: TExpandedMatch) => string);
  dynamicCrumb?: (params: any) => string | undefined;
};

export type TExpandedMatch = UIMatch<unknown, TCustomRouteHandle>;
