export type TTabs<T> = {
  data: T[];
  optionLabel?: (item: T) => string;
  optionCount?: (item: T) => number;
  onChange?: (item: T) => void;
  activeTab?: T;
};
