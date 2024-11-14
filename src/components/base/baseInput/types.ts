
import type { InputHTMLAttributes } from "vue";

export interface IHTMLInputEvent extends Event {
  target: HTMLInputElement;
}

export interface IBaseInput extends InputHTMLAttributes {
  modelValue?: string | number;
  cleanable?: boolean;
  disabled?: boolean;
}
