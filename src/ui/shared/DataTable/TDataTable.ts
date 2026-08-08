import { EStatus } from "@/data/enum/status";
import { TIcon } from "@/data/types/Common";
import { TBadgeColors } from "@/ui/shared/Badge/TBadge";
import { TButton } from "@/ui/shared/Button/TButton";
import { CSSProperties, ReactNode, RefObject } from "react";

export type TColumn<T> = {
  field: keyof T;
  title: string;
  render?: (item: T) => ReactNode;
  style?: CSSProperties;
  className?: string;
  action?: boolean;
  show?: "MOBILE" | "DESKTOP" | "BOTH";
  hidden?: boolean;
  renderStatus?(item: T): TTableStatus;
  actionDisabled?: (item: T) => boolean;
};

export type TDataTable<T, S> = {
  data?: T[];
  count?: number;
  columns: TColumn<T>[];
  title?: string;
  stripped?: boolean;
  showCount?: boolean;
  unit?: string;
  currentPage: number;
  onPageChange(page: number): void;
  onPageSizeChange?(pageSize: number): void;
  className?: string;
  pageSize?: number;
  mobileVisibleFields?: Array<keyof T>;
  loading?: boolean;
  onExport?(): void;
  exportLoading?: boolean;

  collapsible?: boolean;
  isHeightFixed?: boolean;
  subColumns?: TColumn<S>[];
  subItemsKey?: keyof T;
  onRowExpand?(item: T, index: number): void;
  loadingSubRows?: number[];
  actions?: ReactNode;
};

export type TCollapseCell<T> = {
  data: T;
  columns: TColumn<T>[];
  expand: boolean;
  containerRef?: RefObject<HTMLDivElement | null>;
};

export type TTTableActionClassnames = {
  button?: string;
  panel?: string;
  content?: string;
};

export type TTableAction = {
  className?: string;
  children?: ReactNode;
  classNames?: TTTableActionClassnames;
  containerRef?: RefObject<HTMLDivElement | null>;
  disabled?: boolean;
};

export type TActionButton = TButton & {
  color?: TBadgeColors;
  action: TTableActions;
};

export type TTableStatus = {
  id: EStatus;
  label?: string;
  color?: TBadgeColors;
  icon?: TIcon;
};

export type TStatusOverrideMap = Partial<
  Record<EStatus, Partial<TTableBadgeType>>
>;

export type TStatusCell = {
  status: TTableStatus;
  tooltip?: string;
  overrides?: TStatusOverrideMap;
};

export type TTableBadgeType = {
  color: TBadgeColors;
  icon?: TIcon;
  label: string;
};

export type TActionTypes = {
  icon: TIcon;
  color: TBadgeColors;
};

export type TTableActions =
  | "edit"
  | "delete"
  | "view"
  | "confirm"
  | "return"
  | "refresh";
