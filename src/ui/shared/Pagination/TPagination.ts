export type TPagination = {
  count: number;
  page: number;
  onChange(page: number): void;
  className?: string;
};
