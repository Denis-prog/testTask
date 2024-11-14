import type { ButtonHTMLAttributes } from "vue";

export type BtnStatusType =
  | "primary"

  | "success"

  | "danger"



export type BtnVariantType = "contained" | "ghost";

export type BtnSizeType = "small" | "medium";

export interface IBtnProps extends ButtonHTMLAttributes {
  btnText?: string;
  disabled?: boolean;
  variant?: BtnVariantType;
  size?: BtnSizeType;
  icon?: string;
  status?: BtnStatusType;
}
