export type TToastType = "confirm" | "return" | "remove";

export type TToast = {
  title: string;
  type?: TToastType;
};
